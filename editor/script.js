(function () {
  'use strict';

  // 버튼 커맨드 배열
  const commands = [
    {
      cmd: 'backColor',
      val: 'red',
      label: '배경 컬러',
    },
    {
      cmd: 'bold',
      label: '굵기',
    },
    {
      cmd: 'delete',
      label: '삭제',
    },
    {
      cmd: 'fontSize',
      label: '폰트 사이즈',
      val: '1-7',
    },
    {
      cmd: 'foreColor',
      label: '폰트 컬러',
      val: 'rgba(0,0,0,.5)',
    },
    {
      cmd: 'insertImage',
      label: '이미지 추가',
      val: 'http://dummyimage.com/160x90',
    },
    {
      cmd: 'italic',
      label: '기울이기',
    },
    {
      cmd: 'justifyCenter',
      label: '중앙 정렬',
    },
    {
      cmd: 'justifyFull',
      label: '양쪽 정렬',
    },
    {
      cmd: 'justifyLeft',
      label: '좌측 정렬',
    },
    {
      cmd: 'justifyRight',
      label: '우측 정렬',
    },

    {
      cmd: 'selectAll',
      label: '전체 선택',
    },
    {
      cmd: 'underline',
      label: '밑줄',
    },
    {
      cmd: 'undo',
      label: '취소',
    },
  ];

  let commandObject = {};

  const get = (target) => {
    return document.querySelector(target);
  };

  const doCommand = (cmdKey) => {
    const cmd = commandObject[cmdKey];

    const val =
      typeof cmd.val != 'undefined' ? prompt('값을 입력해주세요', cmd.val) : '';
    document.execCommand(cmd.cmd, false, val || '');
  };

  const onClickShowEditorButton = () => {
    $editorEdit.innerHTML = $editorHTML.innerText;
    $editorEdit.classList.toggle('show');
    $editorHTML.classList.toggle('show');
  };

  const onClickShowHTMLButton = () => {
    $editorHTML.innerText = $editorEdit.innerHTML;
    $editorEdit.classList.toggle('show');
    $editorHTML.classList.toggle('show');
  };

  const $editorButtons = get('.editor_buttons'); // 에디터 버튼
  const $showEditorButton = get('.show_editor_button'); // 에디터로 보기 버튼
  const $showHTMLButton = get('.show_html_button'); // html로 보기 버튼
  const $editorEdit = get('.editor.edit'); // 에디터 편집기
  const $editorHTML = get('.editor.html'); // HTML 편집기

  const init = () => {
    commands.map((command) => {
      commandObject[command.cmd] = command;

      const element = document.createElement('button');
      element.innerHTML = command.label;
      element.addEventListener('click', (e) => {
        e.preventDefault();
        doCommand(command.cmd);
      });
      $editorButtons.appendChild(element);
    });
  };

  $showEditorButton.addEventListener('click', onClickShowEditorButton);
  $showHTMLButton.addEventListener('click', onClickShowHTMLButton);

  init();
})();
