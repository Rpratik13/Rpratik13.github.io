function navbar () {
    var nav = document.getElementById("nav-bar-fcns").style.display;
    console.log(nav);

    if (nav == 'none' || nav=='') {
        nav = "block";
    } else {
        nav = 'none';
    };
    document.getElementById("nav-bar-fcns").style.display = nav;
};


function accordionOpen () {

    var acc = document.getElementById("accordion-details-1").style.display;
    if (acc == 'none' || acc =='') {
        acc = "block";
        document.getElementById("arrow-down").style.display = 'none';
        document.getElementById("arrow-up").style.display = 'initial';
    } else {
        acc = 'none';
        document.getElementById("arrow-down").style.display = 'initial';
        document.getElementById("arrow-up").style.display = 'none';
    };
    document.getElementById("accordion-details-1").style.display = acc;
};


function accordionOpen1 () {

    var acc = document.getElementById("accordion-details2").style.display;
    if (acc == 'none' || acc =='') {
        acc = "block";
        document.getElementById("arrow-down").style.display = 'none';
        document.getElementById("arrow-up").style.display = 'initial';
    } else {
        acc = 'none';
        document.getElementById("arrow-down").style.display = 'initial';
        document.getElementById("arrow-up").style.display = 'none';
    };
    document.getElementById("accordion-details2").style.display = acc;
};