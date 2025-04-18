/**
 * 기술사 서브노트 데이터 로더
 * 
 * JSON 파일에서 과목별 데이터를 로드하고 관리하는 모듈
 */

// 데이터 관리 객체
const DataManager = {
    // 과목별 데이터 저장 객체
    subjectData: {},
    
    // 모든 과목 목록
    subjectList: [],
    
    // 마지막 검색 결과
    lastSearchResults: [],
    
    // 데이터 인덱스 로드
    async loadIndex() {
        try {
            const response = await fetch('data/index.json');
            const indexData = await response.json();
            
            this.subjectList = indexData.sheets;
            
            // 과목 선택 드롭다운 업데이트
            const subjectSelect = document.getElementById('subjectSelect');
            
            // 기존 옵션 제거 (첫 번째 '전체 과목' 옵션 유지)
            while (subjectSelect.options.length > 1) {
                subjectSelect.remove(1);
            }
            
            // 새 옵션 추가
            this.subjectList.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject;
                subjectSelect.appendChild(option);
            });
            
            return true;
        } catch (error) {
            console.error('데이터 인덱스 로드 실패:', error);
            return false;
        }
    },
    
    // 특정 과목 데이터 로드
    async loadSubjectData(subject) {
        if (this.subjectData[subject]) {
            return this.subjectData[subject]; // 이미 로드된 데이터가 있으면 반환
        }
        
        try {
            const response = await fetch(`data/${subject}.json`);
            const data = await response.json();
            
            // 데이터 캐싱
            this.subjectData[subject] = data;
            
            return data;
        } catch (error) {
            console.error(`${subject} 데이터 로드 실패:`, error);
            return null;
        }
    },
    
    // 모든 과목 데이터 로드
    async loadAllSubjects() {
        for (const subject of this.subjectList) {
            await this.loadSubjectData(subject);
        }
        
        return this.subjectData;
    },
    
    // 현재 로드된 모든 데이터 가져오기
    getAllLoadedData() {
        const allData = [];
        
        // 모든 과목의 데이터를 하나의 배열로 합치기
        Object.entries(this.subjectData).forEach(([subject, data]) => {
            // 각 항목에 과목 정보 추가
            const subjectData = data.map(item => ({
                ...item,
                과목: subject
            }));
            
            allData.push(...subjectData);
        });
        
        return allData;
    },
    
    // 특정 과목의 데이터 가져오기
    getSubjectData(subject) {
        if (subject === 'all') {
            return this.getAllLoadedData();
        }
        
        if (!this.subjectData[subject]) {
            return [];
        }
        
        return this.subjectData[subject].map(item => ({
            ...item,
            과목: subject
        }));
    }
};

// 데이터 초기화 함수
async function initializeData() {
    // 인덱스 로드
    const indexLoaded = await DataManager.loadIndex();
    
    if (indexLoaded) {
        // 모든 과목 데이터 미리 로드
        await DataManager.loadAllSubjects();
        console.log('모든 과목 데이터 로드 완료');
    }
}

// 페이지 로드 시 데이터 초기화
document.addEventListener('DOMContentLoaded', initializeData);
