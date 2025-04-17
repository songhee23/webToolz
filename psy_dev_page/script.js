// 네비게이션 메뉴 토글
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // 네비게이션 토글
        nav.classList.toggle('active');

        // 링크 애니메이션
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // 버거 애니메이션
        burger.classList.toggle('toggle');
    });
};

// 히어로 섹션 버튼 이벤트
const heroButtons = () => {
    const solutionBtn = document.querySelector('.hero-buttons .primary');
    const researchBtn = document.querySelector('.hero-buttons .secondary');

    solutionBtn.addEventListener('click', () => {
        document.querySelector('#solution').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });

    researchBtn.addEventListener('click', () => {
        document.querySelector('#research').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
};

// 스크롤 애니메이션
const scrollAnimation = () => {
    const sections = document.querySelectorAll('.section');
    
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver((entries, fadeInObserver) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    sections.forEach(section => {
        section.classList.add('fade-in');
        fadeInObserver.observe(section);
    });
};

// 적용 분야 탭 기능
const applicationTabs = () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 모든 버튼에서 active 클래스 제거
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 클릭한 버튼에 active 클래스 추가
            button.classList.add('active');

            // 모든 탭 패널 숨기기
            tabPanes.forEach(pane => pane.classList.remove('active'));
            // 선택한 탭 패널 표시
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
};

// 스크롤 시 헤더 스타일 변경
const scrollHeader = () => {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
};

// 스크롤 시 숫자 카운팅 애니메이션
const countAnimation = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    const countObserverOptions = {
        threshold: 0.5
    };
    
    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const numText = target.textContent;
                const num = parseFloat(numText.replace(/[^0-9.]/g, ''));
                const suffix = numText.replace(/[0-9.]/g, '');
                let count = 0;
                const time = 2000;
                const step = num / time * 10;
                
                const counting = setInterval(() => {
                    count += step;
                    if (count > num) {
                        clearInterval(counting);
                        target.textContent = numText;
                    } else {
                        target.textContent = Math.floor(count) + suffix;
                    }
                }, 10);
                
                observer.unobserve(target);
            }
        });
    }, countObserverOptions);
    
    stats.forEach(stat => {
        countObserver.observe(stat);
    });
};

// 자가 평가 도구 기능
const selfAssessment = () => {
    const questions = document.querySelectorAll('.question-card');
    const totalQuestions = questions.length;
    const progressIndicator = document.getElementById('progress-indicator');
    const currentQuestionText = document.getElementById('current-question');
    const totalQuestionsText = document.getElementById('total-questions');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const submitButton = document.getElementById('submit-button');
    const resultsContainer = document.getElementById('results-container');
    
    if (!progressIndicator || !currentQuestionText || !totalQuestionsText) {
        return; // 요소가 존재하지 않으면 함수 종료
    }
    
    let currentQuestion = 1;
    
    // 총 문항 수 표시
    totalQuestionsText.textContent = totalQuestions;
    
    // 진행률 업데이트 함수
    const updateProgress = () => {
        progressIndicator.style.width = `${(currentQuestion / totalQuestions) * 100}%`;
        currentQuestionText.textContent = currentQuestion;
        
        // 버튼 상태 업데이트
        if (currentQuestion === 1) {
            prevButton.disabled = true;
        } else {
            prevButton.disabled = false;
        }
        
        if (currentQuestion === totalQuestions) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'block';
        } else {
            nextButton.style.display = 'block';
            submitButton.style.display = 'none';
        }
    };
    
    // 현재 문항 업데이트 함수
    const showQuestion = (questionNumber) => {
        questions.forEach(question => {
            question.classList.remove('active');
        });
        
        document.querySelector(`.question-card[data-question="${questionNumber}"]`).classList.add('active');
        updateProgress();
    };
    
    // 다음 문항 버튼 클릭 이벤트
    nextButton.addEventListener('click', () => {
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            showQuestion(currentQuestion);
        }
    });
    
    // 이전 문항 버튼 클릭 이벤트
    prevButton.addEventListener('click', () => {
        if (currentQuestion > 1) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    });
    
    // 결과 제출 버튼 클릭 이벤트
    submitButton.addEventListener('click', () => {
        // 응답 값 가져오기
        const answers = [];
        
        for (let i = 1; i <= totalQuestions; i++) {
            const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
            if (selectedOption) {
                answers.push(parseInt(selectedOption.value));
            } else {
                answers.push(0); // 문항에 대한 응답이 없는 경우
            }
        }
        
        // 결과 표시
        showResults(answers);
    });
    
    // 결과 표시 함수
    const showResults = (answers) => {
        // 강점 영역 계산
        const strengthAreas = [
            { name: '긍정적 사고', score: answers[0] },
            { name: '공감 능력', score: answers[1] },
            { name: '목표 지향성', score: answers[2] },
            { name: '정서 조절', score: answers[3] },
            { name: '학습 열정', score: answers[4] }
        ];
        
        // 강점 순위대로 정렬
        strengthAreas.sort((a, b) => b.score - a.score);
        
        // 결과 페이지 표시
        resultsContainer.style.display = 'block';
        document.querySelector('.assessment-tool .assessment-progress').style.display = 'none';
        document.querySelector('.question-container').style.display = 'none';
        document.querySelector('.assessment-navigation').style.display = 'none';
        
        // 강점 분석 텍스트 표시
        document.getElementById('primary-strength-text').textContent = `
            당신의 주요 강점은 '${strengthAreas[0].name}' 영역입니다. 
            이 강점을 기반으로 자신과 다른 사람들의 삶에 크게 기여할 수 있습니다.
        `;
        
        document.getElementById('growth-opportunities-text').textContent = `
            '${strengthAreas[4].name}' 영역은 당신이 지금보다 더 발전시키면 크게 도움이 될 수 있는 영역입니다. 
            GrowthMind는 이 영역의 개발을 위한 과학적 접근법을 제시합니다.
        `;
        
        // 차트 생성 (Chart.js 사용)
        createResultChart(strengthAreas);
        
        // 다시 평가하기 버튼 클릭 이벤트
        document.getElementById('restart-assessment').addEventListener('click', () => {
            resetAssessment();
        });
        
        // 플랫폼 알아보기 버튼 클릭 이벤트
        document.getElementById('explore-platform').addEventListener('click', () => {
            document.querySelector('#applications').scrollIntoView({ behavior: 'smooth' });
        });
    };
    
    // 평가 리셋 함수
    const resetAssessment = () => {
        // 모든 응답 초기화
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        
        // 첫 문항으로 이동
        currentQuestion = 1;
        showQuestion(currentQuestion);
        
        // 결과 페이지 숨기기
        resultsContainer.style.display = 'none';
        document.querySelector('.assessment-tool .assessment-progress').style.display = 'block';
        document.querySelector('.question-container').style.display = 'block';
        document.querySelector('.assessment-navigation').style.display = 'flex';
    };
    
    // 차트 생성 함수
    const createResultChart = (strengthAreas) => {
        const ctx = document.getElementById('results-chart').getContext('2d');
        
        // Chart.js를 사용한 레이다 차트 생성
        const labels = strengthAreas.map(area => area.name);
        const data = strengthAreas.map(area => area.score);
        const backgroundColors = [
            'rgba(106, 90, 205, 0.7)',  // 주색상
            'rgba(102, 187, 106, 0.7)', // 보조색상
            'rgba(248, 165, 74, 0.7)',  // 액센트색상
            'rgba(66, 133, 244, 0.7)',  // 파란색
            'rgba(234, 67, 53, 0.7)'    // 빨간색
        ];
        
        // Chart.js가 있는지 확인
        if (typeof Chart !== 'undefined') {
            if (window.resultChart) {
                window.resultChart.destroy(); // 기존 차트가 있으면 제거
            }
            
            window.resultChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '당신의 심리적 강점 프로필',
                        data: data,
                        backgroundColor: 'rgba(106, 90, 205, 0.2)',
                        borderColor: 'rgba(106, 90, 205, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: backgroundColors,
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(106, 90, 205, 1)'
                    }]
                },
                options: {
                    scales: {
                        r: {
                            angleLines: {
                                display: true
                            },
                            suggestedMin: 0,
                            suggestedMax: 5
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.parsed.r}/5`;
                                }
                            }
                        }
                    }
                }
            });
        } else {
            // Chart.js가 없는 경우 대체 UI 표시
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#6a5acd';
            ctx.fillText('차트 라이브러리가 로드되지 않았습니다.', 150, 150);
            
            // 간단한 바 그래프 안내 텍스트 추가
            let y = 180;
            strengthAreas.forEach(area => {
                ctx.fillStyle = '#333';
                ctx.textAlign = 'left';
                ctx.fillText(`${area.name}: ${area.score}`, 50, y);
                y += 20;
            });
        }
    };
    
    // 초기화
    updateProgress();
};

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    heroButtons();
    scrollAnimation();
    applicationTabs();
    scrollHeader();
    countAnimation();
    selfAssessment();

    // CSS 클래스 추가
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in');
    });
    
    // 스크롤 이벤트 처리
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 네비게이션 메뉴 닫기 (모바일)
            const nav = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            }
            
            // 해당 섹션으로 스크롤
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// 버거 메뉴 애니메이션 토글 클래스
const burger = document.querySelector('.burger');
if (burger) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('toggle');
    });
}

// CSS 애니메이션에 필요한 스타일 동적 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.appear {
        opacity: 1;
        transform: translateY(0);
    }
    
    .burger.toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .burger.toggle .line2 {
        opacity: 0;
    }
    
    .burger.toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    header.scrolled {
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }
    
    .tab-pane {
        display: none;
    }
    
    .tab-pane.active {
        display: block;
        animation: fadeIn 0.5s ease;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

document.head.appendChild(style);