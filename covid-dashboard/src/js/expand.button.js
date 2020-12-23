export function expandButton(){
    const switchButton = document.querySelectorAll('.expandIcon');
    let menuOpen = false;
    function expand(className){
        if(!menuOpen){
            document.querySelector(`.${className}`).classList.add('open');
            menuOpen= true;
           document.querySelectorAll('.grid-item')[1].style.position = 'static';
           document.querySelector('.death-list').style.height = '80vh'
           document.querySelector('.recovery-list').style.height = '80vh'
           document.querySelector('.blockbtn').style.margin = '7px 126px 0 0'
           document.querySelectorAll('.grid-item')[0].style.fontSize = '30px';
           document.querySelectorAll('.grid-item')[1].style.fontSize = '30px';
           document.querySelectorAll('.grid-item')[2].style.fontSize = '30px';
           document.querySelectorAll('.grid-item')[3].style.fontSize = '30px';
           document.querySelectorAll('.grid-item')[4].style.fontSize = '30px';
        }else{
            document.querySelector(`.${className}`).classList.remove('open');
            menuOpen = false;
            document.querySelectorAll('.grid-item')[1].style.position = 'relative';
            document.querySelector('.death-list').style.height = '33vh'
           document.querySelector('.recovery-list').style.height = '33vh'
           document.querySelector('.blockbtn').style.margin = '-12px 0 0 0'
           document.querySelectorAll('.grid-item')[0].style.fontSize = '13px';
           document.querySelectorAll('.grid-item')[1].style.fontSize = '13px';
           document.querySelectorAll('.grid-item')[2].style.fontSize = '13px';
           document.querySelectorAll('.grid-item')[3].style.fontSize = '13px';
           document.querySelectorAll('.grid-item')[4].style.fontSize = '13px';

        }
    }
    switchButton[0].addEventListener('click', () =>{
        expand('item1')
    })
    switchButton[1].addEventListener('click', () =>{
        expand('block1')
    })
    switchButton[2].addEventListener('click', () =>{
        expand('block2')
    })
    switchButton[3].addEventListener('click', () =>{
        expand('item3')
    })
    switchButton[4].addEventListener('click', () =>{
        expand('item4')
    })
    switchButton[5].addEventListener('click', () =>{
        expand('item5')
    })
    
}