/* ==========================================================
   할 일 설정
========================================================== */

const tasks = [

    {
        name: "양치하기",
        password: "치카치카"
    },

    {
        name: "머리 빗기",
        password: "슥슥"
    },

    {
        name: "옷 입기",
        password: "정장"
    },

    {
        name: "브라운 챙기기",
        password: "쇼 비즈니스 맙소사"
    }

];


/* ==========================================================
   캐릭터 이미지
========================================================== */

const characterImages = [

    "images/character0.png",
    "images/character1.png",
    "images/character2.png",
    "images/character3.png",
    "images/character4.png"

];


/* ==========================================================
   게임 상태
========================================================== */

let completedTasks = [
    false,
    false,
    false,
    false
];

let currentTask = null;


/* ==========================================================
   시작
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadGame();

        updateGame();


        /* ==================================================
           시작 화면
        ================================================== */

        const startScreen =
            document.getElementById(
                "startScreen"
            );

        const startButton =
            document.getElementById(
                "startButton"
            );


        if (
            startButton &&
            startScreen
        ) {

            startButton.addEventListener(
                "click",
                function () {

                    startScreen.classList.add(
                        "hide"
                    );


                    setTimeout(
                        function () {

                            startScreen.style.display =
                                "none";

                        },
                        500
                    );

                }
            );

        }

    }
);


/* ==========================================================
   행동 선택
========================================================== */

function selectAction(index) {

    /*
       이미 완료된 행동
    */

    if (
        completedTasks[index]
    ) {

        return;

    }


    /*
       이전 행동을 완료했는지 확인
    */

    if (
        index > 0 &&
        !completedTasks[index - 1]
    ) {

        return;

    }


    currentTask = index;

    openPasswordModal();

}


/* ==========================================================
   팝업 열기
========================================================== */

function openPasswordModal() {

    const modal =
        document.getElementById(
            "passwordModal"
        );

    const input =
        document.getElementById(
            "passwordInput"
        );

    const error =
        document.getElementById(
            "passwordError"
        );


    if (
        !modal ||
        !input ||
        !error
    ) {

        return;

    }


    modal.classList.remove(
        "hidden"
    );


    input.value = "";


    error.classList.remove(
        "show"
    );


    setTimeout(
        function () {

            input.focus();

        },
        50
    );

}


/* ==========================================================
   비밀번호 확인
========================================================== */

function confirmPassword() {

    if (
        currentTask === null
    ) {

        return;

    }


    const input =
        document.getElementById(
            "passwordInput"
        );

    const error =
        document.getElementById(
            "passwordError"
        );


    if (
        !input ||
        !error
    ) {

        return;

    }


    const enteredPassword =
        input.value;


    const correctPassword =
        tasks[currentTask].password;


    /* ======================================================
       정답
    ====================================================== */

    if (
        enteredPassword ===
        correctPassword
    ) {

        const completedTaskIndex =
            currentTask;


        completedTasks[
            completedTaskIndex
        ] = true;


        closePasswordModal();

        saveGame();

        updateGame();


        updateDialogue(
            completedTaskIndex + 1
        );

    }


    /* ======================================================
       오답
    ====================================================== */

    else {

        error.classList.add(
            "show"
        );


        input.value = "";

        input.focus();

    }

}


/* ==========================================================
   팝업 닫기
========================================================== */

function closePasswordModal() {

    const modal =
        document.getElementById(
            "passwordModal"
        );


    if (
        modal
    ) {

        modal.classList.add(
            "hidden"
        );

    }


    currentTask = null;

}


/* ==========================================================
   Enter / ESC
========================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        const modal =
            document.getElementById(
                "passwordModal"
            );


        if (
            !modal ||
            modal.classList.contains(
                "hidden"
            )
        ) {

            return;

        }


        if (
            event.key === "Enter"
        ) {

            confirmPassword();

        }


        if (
            event.key === "Escape"
        ) {

            closePasswordModal();

        }

    }
);


/* ==========================================================
   화면 업데이트
========================================================== */

function updateGame() {

    let completedCount = 0;


    for (
        let i = 0;
        i < completedTasks.length;
        i++
    ) {

        if (
            completedTasks[i]
        ) {

            completedCount++;

        }

    }


    /* ======================================================
       캐릭터 변경
    ====================================================== */

    const character =
        document.getElementById(
            "characterImage"
        );


    if (
        character
    ) {

        character.src =
            characterImages[
                completedCount
            ];

    }


    /* ======================================================
       오늘의 할 일
    ====================================================== */

    for (
        let i = 0;
        i < 4;
        i++
    ) {

        const todo =
            document.getElementById(
                `todo${i}`
            );


        if (
            !todo
        ) {

            continue;

        }


        const check =
            todo.querySelector(
                ".check"
            );


        if (
            completedTasks[i]
        ) {

            todo.classList.add(
                "completed"
            );


            if (
                check
            ) {

                check.textContent =
                    "☑";

            }

        }

        else {

            todo.classList.remove(
                "completed"
            );


            if (
                check
            ) {

                check.textContent =
                    "□";

            }

        }

    }


    /* ======================================================
       행동 버튼
    ====================================================== */

    for (
        let i = 0;
        i < 4;
        i++
    ) {

        const button =
            document.getElementById(
                `action${i}`
            );


        if (
            !button
        ) {

            continue;

        }


        /*
           완료된 행동
        */

        if (
            completedTasks[i]
        ) {

            button.disabled =
                true;


            button.classList.remove(
                "locked"
            );


            button.classList.add(
                "completed"
            );

        }


        /*
           현재 차례인 행동
        */

        else if (
            i === 0 ||
            completedTasks[i - 1]
        ) {

            button.disabled =
                false;


            button.classList.remove(
                "locked"
            );


            button.classList.remove(
                "completed"
            );

        }


        /*
           아직 차례가 아닌 행동
        */

        else {

            button.disabled =
                true;


            button.classList.add(
                "locked"
            );


            button.classList.remove(
                "completed"
            );

        }

    }


    /* ======================================================
       출근하기
    ====================================================== */

    const workButton =
        document.getElementById(
            "workButton"
        );


    if (
        workButton
    ) {

        const allComplete =
            completedTasks.every(
                function (value) {

                    return value === true;

                }
            );


        workButton.disabled =
            !allComplete;

    }

}


/* ==========================================================
   저장
========================================================== */

function saveGame() {

    localStorage.setItem(
        "gameCompletedTasks",
        JSON.stringify(
            completedTasks
        )
    );

}


/* ==========================================================
   불러오기
========================================================== */

function loadGame() {

    const saved =
        localStorage.getItem(
            "gameCompletedTasks"
        );


    if (
        !saved
    ) {

        return;

    }


    try {

        const data =
            JSON.parse(
                saved
            );


        if (
            Array.isArray(data) &&
            data.length === 4
        ) {

            completedTasks =
                data;

        }

    }

    catch (
        error
    ) {

        console.log(
            "게임 데이터를 불러오지 못했습니다."
        );

    }

}


/* ==========================================================
   출근하기
========================================================== */

function goToWork() {

    startPhoneMessageEvent();

}


/* ==========================================================
   핸드폰 문자 이벤트 시작
========================================================== */

function startPhoneMessageEvent() {

    /*
       이미 실행 중이면 중복 실행하지 않음
    */

    if (
        document.getElementById(
            "phoneEvent"
        )
    ) {

        return;

    }


    /* ======================================================
       이벤트 화면 생성
    ====================================================== */

    const phoneEvent =
        document.createElement(
            "div"
        );


    phoneEvent.id =
        "phoneEvent";


    phoneEvent.innerHTML = `

        <div id="phoneEventBackground"></div>


        <div id="phoneContainer">

            <div id="phone">

                <div id="phoneNotch"></div>


                <div id="phoneScreen">

                    <div id="phoneTime">
                        00:00
                    </div>


                    <div id="phoneLockText">
                        휴대전화
                    </div>

                </div>

            </div>


            <div id="messageNotification">

                <div class="notification-top">

                    <span>
                        메시지
                    </span>


                    <span>
                        방금
                    </span>

                </div>


                <div class="notification-sender">
                    은하제 대리님
                </div>


                <div class="notification-message">
                    노루야, 이번에 배정된 어둠이다.
                </div>

            </div>


            <button
                id="openPhoneButton"
                type="button"
            >
                메시지 확인
            </button>

        </div>


        <div id="messageWindow">

            <div class="message-header">

                <button
                    id="closeMessageButton"
                    type="button"
                >
                    ‹
                </button>


                <div>

                    <div class="message-name">
                        은하제 대리님
                    </div>


                    <div class="message-status">
                        메시지
                    </div>

                </div>

            </div>


            <div
                class="message-content"
                id="messageContent"
            >

                <div class="message-bubble">
                    노루야, 이번에 배정된 어둠이다.
                </div>


                <div
                    class="message-time"
                    id="messageTime"
                >
                    오전 8:32
                </div>

            </div>


            <button
                id="nextChapterButton"
                type="button"
            >
                답장하기
            </button>

        </div>

    `;


    document.body.appendChild(
        phoneEvent
    );


    /* ======================================================
       현재 시간
    ====================================================== */

    updatePhoneTime();

    updateMessageTime();


    const phoneClock =
        setInterval(
            updatePhoneTime,
            1000
        );


    phoneEvent.dataset.clock =
        phoneClock;


    /* ======================================================
       화면 등장
    ====================================================== */

    setTimeout(
        function () {

            phoneEvent.classList.add(
                "phone-event-active"
            );

        },
        100
    );


    /* ======================================================
       휴대폰 열기
    ====================================================== */

    const openPhoneButton =
        document.getElementById(
            "openPhoneButton"
        );


    if (
        openPhoneButton
    ) {

        openPhoneButton.addEventListener(
            "click",
            function () {

                openMessageWindow();

            }
        );

    }


    /* ======================================================
       처음에는 답장 버튼 숨김
    ====================================================== */

    const nextChapterButton =
        document.getElementById(
            "nextChapterButton"
        );


    if (
        nextChapterButton
    ) {

        nextChapterButton.style.display =
            "none";

    }


    /* ======================================================
       뒤로가기
    ====================================================== */

    const closeMessageButton =
        document.getElementById(
            "closeMessageButton"
        );


    if (
        closeMessageButton
    ) {

        closeMessageButton.addEventListener(
            "click",
            function () {

                closeMessageWindow();

            }
        );

    }

}


/* ==========================================================
   문자창 열기
========================================================== */

function openMessageWindow() {

    const phoneContainer =
        document.getElementById(
            "phoneContainer"
        );


    const messageWindow =
        document.getElementById(
            "messageWindow"
        );


    if (
        !phoneContainer ||
        !messageWindow
    ) {

        return;

    }


    phoneContainer.classList.add(
        "phone-hidden"
    );


    setTimeout(
        function () {

            messageWindow.classList.add(
                "message-open"
            );


            startSecondMessageTimer();

        },
        300
    );

}


/* ==========================================================
   문자창 닫기
========================================================== */

function closeMessageWindow() {

    const messageWindow =
        document.getElementById(
            "messageWindow"
        );


    const phoneContainer =
        document.getElementById(
            "phoneContainer"
        );


    if (
        !messageWindow ||
        !phoneContainer
    ) {

        return;

    }


    messageWindow.classList.remove(
        "message-open"
    );


    setTimeout(
        function () {

            phoneContainer.classList.remove(
                "phone-hidden"
            );

        },
        300
    );

}


/* ==========================================================
   두 번째 문자 자동 도착
========================================================== */

function startSecondMessageTimer() {

    if (
        document.getElementById(
            "secondMessage"
        )
    ) {

        return;

    }


    setTimeout(
        function () {

            showSecondMessage();

        },
        2000
    );

}


/* ==========================================================
   두 번째 문자
========================================================== */

function showSecondMessage() {

    const messageContent =
        document.getElementById(
            "messageContent"
        );


    const nextButton =
        document.getElementById(
            "nextChapterButton"
        );


    if (
        !messageContent
    ) {

        return;

    }


    if (
        document.getElementById(
            "secondMessage"
        )
    ) {

        return;

    }


    if (
        nextButton
    ) {

        nextButton.disabled =
            true;

    }


    const secondMessage =
        document.createElement(
            "div"
        );


    secondMessage.id =
        "secondMessage";


    secondMessage.className =
        "second-message";


    secondMessage.innerHTML = `

        <div class="message-bubble">
            등급은 E등급이고, 무슨... 게임을 이용한 거라는데. 자세한 건 매뉴얼로 확인해 봐.
        </div>


        <div class="message-time">
            방금
        </div>

    `;


    messageContent.appendChild(
        secondMessage
    );


    setTimeout(
        function () {

            secondMessage.classList.add(
                "show"
            );

        },
        50
    );


    if (
        nextButton
    ) {

        nextButton.style.display =
            "none";

    }


    /*
       두 번째 문자가 나타난 뒤
       1.5초 후 파일 도착
    */

    setTimeout(
        function () {

            showIncomingFile();

        },
        1500
    );

}


/* ==========================================================
   파일 도착
========================================================== */

function showIncomingFile() {

    const messageContent =
        document.getElementById(
            "messageContent"
        );


    if (
        !messageContent
    ) {

        return;

    }


    /*
       이미 파일이 있으면 중복 생성하지 않음
    */

    if (
        document.getElementById(
            "incomingFile"
        )
    ) {

        return;

    }


    const file =
        document.createElement(
            "div"
        );


    file.id =
        "incomingFile";


    file.className =
        "incoming-file";


    file.innerHTML = `

        <div class="file-icon">
            📄
        </div>


        <div class="file-info">

            <div class="file-name">
                배정 매뉴얼_김솔음.pdf
            </div>


            <div class="file-text">
                파일을 확인하려면 클릭하세요.
            </div>

        </div>

    `;


    messageContent.appendChild(
        file
    );


    /*
       등장 애니메이션
    */

    setTimeout(
        function () {

            file.classList.add(
                "show"
            );

        },
        50
    );


    /*
       파일 클릭
    */

    file.addEventListener(
        "click",
        function () {

            openDocumentWindow();

        }
    );

}


/* ==========================================================
   문서창 열기
========================================================== */

function openDocumentWindow() {

    /*
       이미 열려 있으면 아무것도 하지 않음
    */

    if (
        document.getElementById(
            "documentWindow"
        )
    ) {

        return;

    }


    const phoneEvent =
        document.getElementById(
            "phoneEvent"
        );


    if (
        !phoneEvent
    ) {

        return;

    }


    const documentWindow =
        document.createElement(
            "div"
        );


    documentWindow.id =
        "documentWindow";


    documentWindow.innerHTML = `

        <div class="document-box">

            <div class="document-header">

                <span>
                    배정 매뉴얼_김솔음.pdf
                </span>


                <button
                    id="closeDocumentButton"
                    type="button"
                >
                    ×
                </button>

            </div>


            <div class="document-paper">

                <p>
                    등급 : E
                </p>


                <p>
                    식별코드 : Qterw-E-913
                </p>

                <p>
                    담당자 : 김솔음
                </p>


                <p>
                    배정된 대상에 대한
                    자세한 사항은 아래의
                    메뉴얼을 참고하십시오.
                </p>


                <p>
                    1. 탐사 진입방법은 ■■■■타운에 접속하는 것으로 진행됨.
                    2. 탐사자 본인의 이름과 동일한 마을로 진입해야 함.
                    3. 기억을 바탕으로 구성되기에, 샅샅이 살필 것.
                </p>


                <p>
                    자세한 내용은 담당자에게
                    문의하십시오.
                </p>

            </div>

        </div>

    `;


    phoneEvent.appendChild(
        documentWindow
    );


    /*
       문서 등장
    */

    setTimeout(
        function () {

            documentWindow.classList.add(
                "document-open"
            );

        },
        50
    );


    /*
       X 버튼
    */

    const closeDocumentButton =
        document.getElementById(
            "closeDocumentButton"
        );


    if (
        closeDocumentButton
    ) {

        closeDocumentButton.addEventListener(
            "click",
            function () {

                closeDocumentWindow();

            }
        );

    }

}


/* ==========================================================
   문서창 닫기
========================================================== */

function closeDocumentWindow() {

    const documentWindow =
        document.getElementById(
            "documentWindow"
        );


    if (!documentWindow) {
        return;
    }


    /*
       마지막 문서인지 확인
    */

    const isFinalDocument =
        documentWindow.dataset.finalDocument === "true";


    /*
       문서창 닫기
    */

    documentWindow.classList.remove(
        "document-open"
    );


    /*
       첫 번째 문서라면
       답장하기 버튼 등장
    */

    if (!isFinalDocument) {

        setTimeout(
            function () {

                documentWindow.remove();


                const nextButton =
                    document.getElementById(
                        "nextChapterButton"
                    );


                if (nextButton) {

                    nextButton.style.display =
                        "block";

                    nextButton.disabled =
                        false;

                    nextButton.textContent =
                        "답장하기";

                    nextButton.onclick =
                        function () {

                           showSolumReply();

                        };

                }

            },
            300
        );

        return;

    }


    /*
       ======================================================
       두 번째 문서라면 최종 엔딩
       ======================================================
    */

    setTimeout(
        function () {

            documentWindow.remove();


            const phoneEvent =
                document.getElementById(
                    "phoneEvent"
                );


            if (!phoneEvent) {
                return;
            }


            /*
               전체 화면 검게
            */

            phoneEvent.classList.add(
                "final-ending"
            );


            /*
               최종 독백
            */

            const endingText =
                document.createElement(
                    "div"
                );


            endingText.className =
                "final-ending-text";


            endingText.textContent =
                "■■■■타운에 접속해야 할 것 같다.";


            phoneEvent.appendChild(
                endingText
            );


            /*
               독백 페이드인
            */

            setTimeout(
                function () {

                    endingText.classList.add(
                        "show"
                    );

                },
                100
            );

        },
        100
    );

}

function showSolumReply() {

    const messageContent =
        document.getElementById("messageContent");

    const nextButton =
        document.getElementById("nextChapterButton");


    if (!messageContent) {
        return;
    }


    /* 답장하기 버튼 숨기기 */

    if (nextButton) {

        nextButton.style.display =
            "none";

    }


    /* 이미 답장이 있다면 중복 실행 방지 */

    if (
        document.getElementById("solumReply")
    ) {

        return;

    }


    /* ======================================================
       솔음 답장
    ====================================================== */

    const reply =
        document.createElement("div");


    reply.id =
        "solumReply";


    reply.className =
        "solum-reply";


    reply.innerHTML = `

        <div class="reply-bubble">
            네, 확인했습니다.
        </div>

        <div class="reply-time">
            방금
        </div>

    `;


    messageContent.appendChild(
        reply
    );


    setTimeout(
        function () {

            reply.classList.add(
                "show"
            );

        },
        50
    );


    /* ======================================================
       1.5초 후 은하제 대리님 답장
    ====================================================== */

    setTimeout(
        function () {

            const finalReply =
                document.createElement("div");


            finalReply.id =
                "finalReply";


            finalReply.className =
                "final-reply";


            finalReply.innerHTML = `

                <div class="final-bubble">
                    그래, 수고해라.
                </div>

                <div class="final-time">
                    방금
                </div>

            `;


            messageContent.appendChild(
                finalReply
            );


            setTimeout(
                function () {

                    finalReply.classList.add(
                        "show"
                    );

                },
                50
            );


            /* ==================================================
               1초 후 대화 종료하기 버튼
            ================================================== */

            setTimeout(
                function () {

                    const endButton =
                        document.createElement(
                            "button"
                        );


                    endButton.id =
                        "endConversationButton";


                    endButton.type =
                        "button";


                    endButton.textContent =
                        "대화 종료하기";


                    messageContent.appendChild(
                        endButton
                    );


                    setTimeout(
                        function () {

                            endButton.classList.add(
                                "show"
                            );

                        },
                        50
                    );


                    endButton.addEventListener(
                        "click",
                        function () {

                            finishChapter();

                        }
                    );


                },
                1000
            );


        },
        1500
    );

}


function finishChapter() {

    const messageWindow =
        document.getElementById("messageWindow");

    const fileWindow =
        document.getElementById("fileWindow");

    const phoneContainer =
        document.getElementById("phoneContainer");

    const phoneScreen =
        document.getElementById("phoneScreen");

    const messageNotification =
        document.getElementById("messageNotification");

    const openPhoneButton =
        document.getElementById("openPhoneButton");


    if (!phoneContainer || !phoneScreen) {
        return;
    }


    /* ======================================================
       문자창 / 파일창 닫기
    ====================================================== */

    if (fileWindow) {

        fileWindow.classList.remove(
            "file-open"
        );

    }


    if (messageWindow) {

        messageWindow.classList.remove(
            "message-open"
        );

    }


    /* ======================================================
       기존 알림 요소 숨기기
    ====================================================== */

    if (messageNotification) {

        messageNotification.style.display =
            "none";

    }


    if (openPhoneButton) {

        openPhoneButton.style.display =
            "none";

    }


    /* ======================================================
       핸드폰 다시 등장
    ====================================================== */

    setTimeout(
        function () {

            phoneContainer.classList.remove(
                "phone-hidden"
            );

        },
        300
    );


    /* ======================================================
   핸드폰 내부 독백
====================================================== */

setTimeout(
    function () {

        phoneScreen.classList.add(
            "phone-ending"
        );


        const endingText =
            document.createElement(
                "div"
            );


        endingText.className =
            "phone-ending-text";


        endingText.textContent =
            "...비슷한 괴담을 본 적 있다.";


        phoneScreen.appendChild(
            endingText
        );


        setTimeout(
            function () {

                endingText.classList.add(
                    "show"
                );

            },
            100
        );


        /*
           독백이 나온 뒤
           5초 후 문서창 등장
        */

        setTimeout(
            function () {

                openSecondDocumentWindow();

            },
            3000
        );

    },
    1500
);

}


/* ==========================================================
   게임 초기화
========================================================== */

function resetGame() {

    const confirmReset =
        confirm(
            "게임을 처음부터 다시 시작할까요?"
        );


    if (
        !confirmReset
    ) {

        return;

    }


    completedTasks = [
        false,
        false,
        false,
        false
    ];


    localStorage.removeItem(
        "gameCompletedTasks"
    );


    updateGame();

    closePasswordModal();

}


/* ==========================================================
   기존 대사
========================================================== */

const dialogueMessages = [

    "출근준비를 도와주셨으면 합니다.",

    "히말라야 솔트 치약... 백사헌의 취향일지도 모르겠습니다.",

    "분명 최근엔... 아, 아닙니다. 옷을 입을까요?",

    "정장을 입는 게 오랜만인 것처럼 느껴집니다.",

    "...출발할까, 브라운."

];


function updateDialogue(index) {

    const dialogueText =
        document.getElementById(
            "dialogueText"
        );


    if (
        !dialogueText
    ) {

        return;

    }


    dialogueText.textContent =
        dialogueMessages[index];

}


/* ==========================================================
   핸드폰 현재 시간
========================================================== */

function updatePhoneTime() {

    const phoneTime =
        document.getElementById(
            "phoneTime"
        );


    if (
        !phoneTime
    ) {

        return;

    }


    const now =
        new Date();


    const hours =
        String(
            now.getHours()
        ).padStart(
            2,
            "0"
        );


    const minutes =
        String(
            now.getMinutes()
        ).padStart(
            2,
            "0"
        );


    phoneTime.textContent =
        hours +
        ":" +
        minutes;

}


/* ==========================================================
   문자 시간
========================================================== */

function updateMessageTime() {

    const messageTime =
        document.getElementById(
            "messageTime"
        );


    if (
        !messageTime
    ) {

        return;

    }


    const now =
        new Date();


    let hours =
        now.getHours();


    const minutes =
        String(
            now.getMinutes()
        ).padStart(
            2,
            "0"
        );


    const period =
        hours < 12
            ? "오전"
            : "오후";


    let displayHours =
        hours % 12;


    if (
        displayHours === 0
    ) {

        displayHours = 12;

    }


    messageTime.textContent =
        period +
        " " +
        displayHours +
        ":" +
        minutes;

}

function openSecondDocumentWindow() {

    if (
        document.getElementById(
            "documentWindow"
        )
    ) {

        return;

    }


    const documentWindow =
        document.createElement(
            "div"
        );


    documentWindow.id =
        "documentWindow";

    documentWindow.dataset.finalDocument = "true";


    documentWindow.innerHTML = `

        <div class="document-box">

            <div class="document-header">

                <span>
                    <어둠탐사기록>
                </span>


                <button
                    id="closeDocumentButton"
                    type="button"
                >
                    ×
                </button>

            </div>


            <div class="document-paper final-document-paper">

                <h2>
                    [당신은 안녕하신가요?]
                </h2>


                <p>
                    : <어둠탐사기록>에 등장하는 괴담, 백일몽 주식회사의 식별코드는 Qterw-E-913
                </p>


                <p>
                    특정 게임과 연관되어 안부를 묻는 행위에서 비롯된 어둠으로, 탐사자의 <span class="red-text">과거 기억을 되돌아보는 것</span>이 주가 된다.
                </p>


                <p>
                    진입방법은 정확히 알려져 있지 않으나, 탐사자 본인과 동일한 이름을 가진 유저의 마을에 접속하는 것이 가장 유력한 것으로 알려져 있다.
                </p>

                <p>
                    해당 공간으로 진입하는 순간, 탐사자의 과거 기억과 숨겨두었던 비밀을 바탕으로 이공간이 형성된다. 비밀이 많은 탐사자의 정보를 볼 수 있다는 점이 별미.
                </p>

                <p>
                    깊게 새겨진 기억은 가끔 <span class="red-text">꿈의 경계</span>를 흐려 탐사자를 가두려는 경향을 보인다.
                </p>

                <p>
                    탐사기록 #13
                </p>

                <p>
                    “분명히, 제가 봤다니까요? 꿈 속에서도 계속해서 제 기억을 들쑤시고 있었다고요!”
                </p>

                <p>
                -박승찬(주임) 인터뷰 중
                </p>
                

            </div>

        </div>

    `;


    document
        .getElementById("phoneEvent")
        .appendChild(
            documentWindow
        );


    setTimeout(
        function () {

            documentWindow.classList.add(
                "document-open"
            );

        },
        50
    );


    document
        .getElementById(
            "closeDocumentButton"
        )
        .addEventListener(
            "click",
            function () {

                closeDocumentWindow();

            }
        );

}