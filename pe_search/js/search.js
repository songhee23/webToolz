/**
 * 기술사 서브노트 검색 기능
 * 
 * 데이터 검색 및 결과 정렬을 처리하는 모듈
 */

// 검색 관리 객체
const SearchManager = {
    // 현재 페이지 번호
    currentPage: 1,
    
    // 페이지당 결과 수
    resultsPerPage: 10,
    
    // 검색 수행
    search(query, subject = 'all', sortBy = 'topic') {
        if (!query.trim()) {
            return [];
        }
        
        // 검색어 전처리
        const normalizedQuery = query.trim().toLowerCase();
        
        // 검색할 데이터 가져오기
        const dataToSearch = DataManager.getSubjectData(subject);
        
        // 검색 결과
        const results = dataToSearch.filter(item => {
            // 토픽에서 검색
            if (item.토픽 && String(item.토픽).toLowerCase().includes(normalizedQuery)) {
                return true;
            }
            
            // 키워드에서 검색 (키워드가 있는 경우)
            if (item.키워드 && String(item.키워드).toLowerCase().includes(normalizedQuery)) {
                return true;
            }
            
            // 정의에서 검색 (정의가 있는 경우)
            if (item.정의 && String(item.정의).toLowerCase().includes(normalizedQuery)) {
                return true;
            }
            
            // 내용에서 검색 (내용이 있는 경우)
            if (item.내용 && String(item.내용).toLowerCase().includes(normalizedQuery)) {
                return true;
            }
            
            return false;
        });
        
        // 결과 점수 계산 및 정렬
        const scoredResults = results.map(item => {
            let score = 0;
            
            // 토픽 일치 점수 (가장 높은 가중치)
            if (item.토픽 && String(item.토픽).toLowerCase().includes(normalizedQuery)) {
                score += 100;
                // 토픽이 정확히 일치하면 더 높은 점수
                if (String(item.토픽).toLowerCase() === normalizedQuery) {
                    score += 50;
                }
            }
            
            // 키워드 일치 점수
            if (item.키워드 && String(item.키워드).toLowerCase().includes(normalizedQuery)) {
                score += 50;
            }
            
            // 정의 일치 점수
            if (item.정의 && String(item.정의).toLowerCase().includes(normalizedQuery)) {
                score += 30;
            }
            
            // 내용 일치 점수
            if (item.내용 && String(item.내용).toLowerCase().includes(normalizedQuery)) {
                score += 10;
            }
            
            return { ...item, score };
        });
        
        // 결과 정렬
        let sortedResults;
        if (sortBy === 'relevance') {
            // 관련성 기준 정렬 (점수 내림차순)
            sortedResults = scoredResults.sort((a, b) => b.score - a.score);
        } else {
            // 토픽 기준 정렬 (가나다순)
            sortedResults = scoredResults.sort((a, b) => {
                const topicA = String(a.토픽).toLowerCase();
                const topicB = String(b.토픽).toLowerCase();
                return topicA.localeCompare(topicB);
            });
        }
        
        // 결과 저장 및 반환
        DataManager.lastSearchResults = sortedResults;
        return sortedResults;
    },
    
    // 현재 페이지 결과 가져오기
    getCurrentPageResults() {
        const startIndex = (this.currentPage - 1) * this.resultsPerPage;
        const endIndex = startIndex + this.resultsPerPage;
        
        return DataManager.lastSearchResults.slice(startIndex, endIndex);
    },
    
    // 전체 페이지 수 계산
    getTotalPages() {
        return Math.ceil(DataManager.lastSearchResults.length / this.resultsPerPage);
    },
    
    // 페이지 이동
    goToPage(pageNumber) {
        const totalPages = this.getTotalPages();
        
        if (pageNumber < 1 || pageNumber > totalPages) {
            return false;
        }
        
        this.currentPage = pageNumber;
        return true;
    },
    
    // 키워드 분리 함수
    parseKeywords(keywordString) {
        if (!keywordString) return [];
        
        // 쉼표로 구분된 키워드 분리
        return String(keywordString).split(',')
            .map(keyword => keyword.trim())
            .filter(keyword => keyword.length > 0);
    },
    
    // 텍스트에서 검색어 하이라이트
    highlightText(text, query) {
        if (!text || !query) return text;
        
        const normalizedQuery = query.trim().toLowerCase();
        const normalizedText = String(text);
        
        // 검색어가 포함된 부분을 하이라이트
        const regex = new RegExp(`(${normalizedQuery})`, 'gi');
        return normalizedText.replace(regex, '<mark>$1</mark>');
    },
    
    // 결과 항목의 키워드 하이라이트
    highlightKeywords(keywords, query) {
        if (!keywords) return '';
        
        const keywordArray = this.parseKeywords(keywords);
        const normalizedQuery = query.trim().toLowerCase();
        
        return keywordArray.map(keyword => {
            if (keyword.toLowerCase().includes(normalizedQuery)) {
                const regex = new RegExp(`(${normalizedQuery})`, 'gi');
                return `<span class="keyword">${keyword.replace(regex, '<mark>$1</mark>')}</span>`;
            }
            return `<span class="keyword">${keyword}</span>`;
        }).join(' ');
    }
};

// 검색 이벤트 핸들러
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const subjectSelect = document.getElementById('subjectSelect');
    const sortSelect = document.getElementById('sortSelect');
    
    // 검색 실행 함수
    const executeSearch = () => {
        const query = searchInput.value.trim();
        const subject = subjectSelect.value;
        const sortBy = sortSelect.value;
        
        if (query.length === 0) {
            displayWelcomeMessage();
            return;
        }
        
        // 검색 수행
        const results = SearchManager.search(query, subject, sortBy);
        
        // 첫 페이지로 이동
        SearchManager.currentPage = 1;
        
        // 결과 표시
        displaySearchResults(query);
    };
    
    // 검색 버튼 클릭 이벤트
    searchButton.addEventListener('click', executeSearch);
    
    // 엔터 키 이벤트
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            executeSearch();
        }
    });
    
    // 과목 선택 변경 이벤트
    subjectSelect.addEventListener('change', () => {
        if (searchInput.value.trim().length > 0) {
            executeSearch();
        }
    });
    
    // 정렬 방식 변경 이벤트
    sortSelect.addEventListener('change', () => {
        if (searchInput.value.trim().length > 0) {
            executeSearch();
        }
    });
});
