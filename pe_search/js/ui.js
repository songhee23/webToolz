/**
 * 기술사 서브노트 UI 컨트롤러
 * 
 * 검색 결과 표시 및 사용자 인터페이스 관리 모듈
 */

// 결과 표시 함수
function displaySearchResults(query) {
    const resultsContainer = document.getElementById('searchResults');
    const resultsCount = document.getElementById('resultsCount');
    const paginationControls = document.getElementById('paginationControls');
    const viewMode = document.getElementById('viewMode').checked;
    
    // 현재 페이지의 결과 가져오기
    const pageResults = SearchManager.getCurrentPageResults();
    const totalResults = DataManager.lastSearchResults.length;
    
    // 결과 수 업데이트
    resultsCount.textContent = `검색 결과: ${totalResults}개`;
    
    // 결과 컨테이너 초기화
    resultsContainer.innerHTML = '';
    
    // 결과가 없는 경우
    if (totalResults === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search fa-3x"></i>
                <h3>검색 결과가 없습니다</h3>
                <p>"${query}" 에 대한 검색 결과가 없습니다. 다른 검색어로 시도해보세요.</p>
            </div>
        `;
        paginationControls.innerHTML = '';
        return;
    }
    
    // 각 결과 항목 표시
    pageResults.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        
        // 키워드 처리
        const keywordsHtml = SearchManager.highlightKeywords(item.키워드, query);
        
        // 정의 처리
        const definitionHtml = item.정의 ? 
            SearchManager.highlightText(item.정의, query) : '';
        
        // 내용 처리
        const contentHtml = item.내용 ? 
            SearchManager.highlightText(item.내용, query) : '';
        
        // 요약 보기 모드인 경우
        if (!viewMode) {
            resultItem.innerHTML = `
                <div class="result-header">
                    <h3 class="result-title" data-topic="${item.토픽}" data-subject="${item.과목}">
                        ${SearchManager.highlightText(item.토픽, query)}
                    </h3>
                    <span class="result-subject">${item.과목}</span>
                </div>
                ${keywordsHtml ? `<div class="result-keywords">${keywordsHtml}</div>` : ''}
                ${definitionHtml ? `<div class="result-definition"><strong>정의:</strong> ${definitionHtml}</div>` : ''}
                <span class="more-button" data-topic="${item.토픽}" data-subject="${item.과목}">자세히 보기</span>
            `;
        } 
        // 상세 보기 모드인 경우
        else {
            resultItem.innerHTML = `
                <div class="result-header">
                    <h3 class="result-title" data-topic="${item.토픽}" data-subject="${item.과목}">
                        ${SearchManager.highlightText(item.토픽, query)}
                    </h3>
                    <span class="result-subject">${item.과목}</span>
                </div>
                ${keywordsHtml ? `<div class="result-keywords">${keywordsHtml}</div>` : ''}
                ${definitionHtml ? `<div class="result-definition"><strong>정의:</strong> ${definitionHtml}</div>` : ''}
                ${contentHtml ? `<div class="result-content">${contentHtml}</div>` : ''}
            `;
        }
        
        resultsContainer.appendChild(resultItem);
    });
    
    // 페이지네이션 컨트롤 업데이트
    updatePagination();
    
    // 결과 항목의 이벤트 리스너 추가
    addResultEventListeners();
}

// 환영 메시지 표시 함수
function displayWelcomeMessage() {
    const resultsContainer = document.getElementById('searchResults');
    const resultsCount = document.getElementById('resultsCount');
    const paginationControls = document.getElementById('paginationControls');
    
    resultsCount.textContent = '검색 결과: 0개';
    paginationControls.innerHTML = '';
    
    resultsContainer.innerHTML = `
        <div class="welcome-message">
            <i class="fas fa-book-open fa-3x"></i>
            <h2>원하는 토픽이나 키워드를 검색하세요</h2>
            <p>기술사 서브노트의 토픽, 키워드, 정의, 내용을 검색할 수 있습니다.</p>
        </div>
    `;
}

// 페이지네이션 업데이트 함수
function updatePagination() {
    const paginationControls = document.getElementById('paginationControls');
    const totalPages = SearchManager.getTotalPages();
    const currentPage = SearchManager.currentPage;
    
    // 페이지네이션 컨트롤 초기화
    paginationControls.innerHTML = '';
    
    // 페이지가 1개 이하인 경우 표시하지 않음
    if (totalPages <= 1) {
        return;
    }
    
    // 이전 페이지 버튼
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = '이전';
        prevButton.addEventListener('click', () => {
            SearchManager.goToPage(currentPage - 1);
            displaySearchResults(document.getElementById('searchInput').value);
        });
        paginationControls.appendChild(prevButton);
    }
    
    // 페이지 번호 버튼
    const maxPageButtons = 5; // 한 번에 표시할 최대 페이지 버튼 수
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    
    // startPage 조정
    if (endPage - startPage + 1 < maxPageButtons) {
        startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = i === currentPage ? 'active' : '';
        
        pageButton.addEventListener('click', () => {
            SearchManager.goToPage(i);
            displaySearchResults(document.getElementById('searchInput').value);
        });
        
        paginationControls.appendChild(pageButton);
    }
    
    // 다음 페이지 버튼
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = '다음';
        nextButton.addEventListener('click', () => {
            SearchManager.goToPage(currentPage + 1);
            displaySearchResults(document.getElementById('searchInput').value);
        });
        paginationControls.appendChild(nextButton);
    }
}

// 모달 창 표시 함수
function showTopicModal(topic, subject) {
    // 해당 토픽 데이터 찾기
    const topicData = DataManager.getSubjectData(subject).find(item => 
        item.토픽 === topic && item.과목 === subject
    );
    
    if (!topicData) {
        console.error('토픽 데이터를 찾을 수 없습니다:', topic, subject);
        return;
    }
    
    const modal = document.getElementById('topicModal');
    const modalContent = document.getElementById('modalContent');
    
    // 키워드 처리
    const keywordsHtml = topicData.키워드 ? 
        SearchManager.parseKeywords(topicData.키워드)
            .map(keyword => `<span class="keyword">${keyword}</span>`)
            .join(' ') : '';
    
    // 모달 내용 설정
    modalContent.innerHTML = `
        <h2 class="topic-title">${topicData.토픽}</h2>
        <div class="topic-subject">${subject}</div>
        ${keywordsHtml ? `<div class="topic-keywords">${keywordsHtml}</div>` : ''}
        ${topicData.정의 ? `<div class="topic-definition"><strong>정의:</strong> ${topicData.정의}</div>` : ''}
        ${topicData.내용 ? `<div class="topic-content">${topicData.내용}</div>` : ''}
    `;
    
    // 모달 표시
    modal.style.display = 'block';
}

// 결과 항목 이벤트 리스너 추가 함수
function addResultEventListeners() {
    // 토픽 제목 클릭 시 모달 표시
    document.querySelectorAll('.result-title').forEach(title => {
        title.addEventListener('click', () => {
            const topic = title.getAttribute('data-topic');
            const subject = title.getAttribute('data-subject');
            showTopicModal(topic, subject);
        });
    });
    
    // 자세히 보기 버튼 클릭 시 모달 표시
    document.querySelectorAll('.more-button').forEach(button => {
        button.addEventListener('click', () => {
            const topic = button.getAttribute('data-topic');
            const subject = button.getAttribute('data-subject');
            showTopicModal(topic, subject);
        });
    });
}

// 모달 닫기 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    // 모달 닫기 버튼
    const closeModal = document.querySelector('.close-modal');
    const modal = document.getElementById('topicModal');
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // 모달 바깥 영역 클릭 시 닫기
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // 뷰 모드 토글 이벤트
    const viewModeToggle = document.getElementById('viewMode');
    const viewModeText = document.getElementById('viewModeText');
    
    viewModeToggle.addEventListener('change', () => {
        if (viewModeToggle.checked) {
            viewModeText.textContent = '상세 보기';
        } else {
            viewModeText.textContent = '요약 보기';
        }
        
        // 검색 결과가 있는 경우 결과 다시 표시
        const searchInput = document.getElementById('searchInput');
        if (searchInput.value.trim().length > 0) {
            displaySearchResults(searchInput.value);
        }
    });
    
    // 초기화면 표시
    displayWelcomeMessage();
});
