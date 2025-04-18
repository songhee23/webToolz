/**
 * 기술사 서브노트 엑셀 파서
 * 엑셀 파일을 읽고 데이터를 추출하는 기능을 담당
 */

// 전역 변수 - 데이터 저장
const SubNoteData = {
    subjects: [],        // 과목 목록
    topicsBySubject: {}, // 과목별 토픽 데이터
    allTopics: [],       // 모든 토픽 데이터
    isLoaded: false      // 데이터 로드 여부
};

// 엑셀 파일 로드 및 처리
async function loadExcelFile() {
    try {
        // 상태 업데이트
        updateStatus("엑셀 파일 로드 중...");
        
        // 서브노트 엑셀 파일 경로
        const excelFilePath = '../pe_sub_note/서브노트_SPRINT2_도식포함.xlsx';
        
        // fetch API를 사용하여 엑셀 파일 가져오기
        const response = await fetch(excelFilePath);
        const data = await response.arrayBuffer();
        
        // 엑셀 파일 파싱
        updateStatus("엑셀 파일 분석 중...");
        const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
        
        // 시트 이름 목록 가져오기 (과목 목록)
        SubNoteData.subjects = workbook.SheetNames;
        
        // 각 시트(과목)별 데이터 추출
        updateStatus("각 과목별 데이터 추출 중...");
        
        for (const subject of SubNoteData.subjects) {
            // 시트 데이터 가져오기
            const worksheet = workbook.Sheets[subject];
            
            // JSON 형식으로 변환 (헤더를 포함)
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            
            // 헤더가 있는지 확인
            if (jsonData.length < 2) {
                console.warn(`시트 '${subject}'에 충분한 데이터가 없습니다.`);
                continue;
            }
            
            // 헤더 행 추출
            const headers = jsonData[0];
            
            // 데이터 행 추출 및 객체 변환
            const topicsData = [];
            
            for (let i = 1; i < jsonData.length; i++) {
                const row = jsonData[i];
                
                // 빈 행 건너뛰기
                if (!row || row.length === 0) continue;
                
                const topicObj = {};
                
                // 헤더와 데이터 매핑
                for (let j = 0; j < headers.length && j < row.length; j++) {
                    if (headers[j]) {
                        topicObj[headers[j]] = row[j] || '';
                    }
                }
                
                // 과목 정보 추가
                topicObj.subject = subject;
                
                // 검색 가능한 텍스트 필드 생성
                topicObj.searchText = Object.values(topicObj)
                    .filter(val => typeof val === 'string')
                    .join(' ')
                    .toLowerCase();
                
                topicsData.push(topicObj);
            }
            
            // 과목별 토픽 데이터 저장
            SubNoteData.topicsBySubject[subject] = topicsData;
            
            // 전체 토픽에 추가
            SubNoteData.allTopics = SubNoteData.allTopics.concat(topicsData);
        }
        
        // 데이터 로드 완료
        SubNoteData.isLoaded = true;
        updateStatus(`데이터 로드 완료! 총 ${SubNoteData.allTopics.length}개의 토픽이 있습니다.`);
        
        // 필터 선택자 업데이트
        updateSubjectFilter();
        
        // 사용 가능한 데이터 구조 로그 출력 (디버깅용)
        console.log('로드된 데이터 구조:', SubNoteData);
        
        // 로딩 완료 이벤트 발생
        const event = new CustomEvent('subnote:dataLoaded');
        document.dispatchEvent(event);
        
        return true;
    } catch (error) {
        updateStatus(`데이터 로드 중 오류가 발생했습니다: ${error.message}`);
        console.error('엑셀 파일 로드 실패:', error);
        return false;
    }
}

// 필터 선택자 업데이트
function updateSubjectFilter() {
    const filterSelect = document.getElementById('subjectFilter');
    
    // 기존 옵션 제거 (첫 번째 '전체' 옵션 유지)
    while (filterSelect.options.length > 1) {
        filterSelect.remove(1);
    }
    
    // 과목별 옵션 추가
    SubNoteData.subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject;
        filterSelect.appendChild(option);
    });
}

// 상태 메시지 업데이트
function updateStatus(message) {
    const statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.textContent = message;
    }
    console.log(message);
}

// 검색 함수
function searchTopics(query, subject = 'all') {
    if (!SubNoteData.isLoaded) {
        updateStatus('데이터가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
        return [];
    }
    
    // 검색어가 없으면 빈 배열 반환
    if (!query || query.trim() === '') {
        return [];
    }
    
    // 검색어 전처리
    const searchTerm = query.toLowerCase().trim();
    
    // 검색 대상 데이터 선택
    let searchData;
    if (subject === 'all') {
        searchData = SubNoteData.allTopics;
    } else {
        searchData = SubNoteData.topicsBySubject[subject] || [];
    }
    
    // 검색 실행
    const results = searchData.filter(topic => 
        topic.searchText.includes(searchTerm)
    );
    
    return results;
}

// 문서 로드 완료 시 엑셀 파일 로드 시작
document.addEventListener('DOMContentLoaded', function() {
    // 엑셀 파일 로드
    loadExcelFile();
});
