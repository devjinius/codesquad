# transitionend

보통 대다수의 경우 transition을 사용하여 CSS 애니메이션을 처리한다.

애니메이션이 끝날 경우를 event로 받아야 하는 경우가 있다면 이 때 사용하는 API는 transitionend다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      .move {
        width: 100px;
        height: 100px;
        background-color: #000;
        position: absolute;
        left: 0;
        transition: left 3s ease;
      }

      .move:hover {
        left: 100px;
      }
    </style>
  </head>
  <body>
    <div class="move"></div>
  </body>
  <script>
    const move = document.querySelector('.move');
    move.addEventListener('transitionend', () => {
      console.log('event 종료');
    });
  </script>
</html>
```

이 경우 hover와 hover 해제가 각각 종료되는 경우를 캡쳐할 수 있다.
