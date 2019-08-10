$(document).ready(() => {

  $('#product1').on('mouseover', () =>{
    $('#shoe1').animate({
      width: '300px',
      height: 'auto',

    }, 300)
    //$('#presto1').hide();
  })
  $('#product1').on('mouseleave', () =>{
    $('#shoe1').animate({
      width: '200px',
      height: 'auto',

    }, 300)
  })



  $('#product2').on('mouseover', () =>{
    $('#shoe2').animate({
      width: '300px',
      height: 'auto',

    }, 60)
    //$('#presto1').hide();
  })
  $('#product2').on('mouseleave', () =>{
    $('#shoe2').animate({
      width: '200px',
      height: 'auto',

    }, 60)
  })


  $('#product3').on('mouseover', () =>{
    $('#shoe3').animate({
      width: '300px',
      height: 'auto',

    }, 60)
    //$('#presto1').hide();
  })
  $('#product3').on('mouseleave', () =>{
    $('#shoe3').animate({
      width: '200px',
      height: 'auto',

    }, 60)
  })


  $('#product4').on('mouseover', () =>{
    $('#shoe4').animate({
      width: '300px',
      height: 'auto',

    }, 60)
    //$('#presto1').hide();
  })
  $('#product4').on('mouseleave', () =>{
    $('#shoe4').animate({
      width: '200px',
      height: 'auto',

    }, 60)
  })
});
