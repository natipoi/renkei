function $(name) {
    return document.querySelector(`input[name=${name}]`);
}

var inputElement = $("calc");

inputElement.onclick = function () {
    // p -> 元本
    // S -> 目標額 
    // n -> 運用期間（nか月後)
    // m -> 毎月の投資額
    var p, Sn, r, R, n, m;
    p = parseInt($("kanougaku").value);
    Sn = parseInt($("mokuhixyoukinngaku").value);
    n = parseInt($("kikan").value) * 12;
    m = parseInt($("maituki").value);
    var $result = $("rimawari");

    var rate = 0.001;
    while (rate < 0.10) {
        r = (Math.pow((1 + rate), (1 / 12)) - 1);
        R = 1 + r;
        var S1 = (m * (1 - Math.pow(R, n)) / (1 - R)).toFixed(0);
        console.log("rate is " + rate)
        if (S1 >= Sn) { break; }
        rate += 0.001
    }

    if (rate.toFixed(3) > 0.099) {
        r = 0.099
        var cnt = 1;
        var Sx;
        while (true) {
            R = (Math.pow(1 + r, 1 / n) - 1)
            Sx = (m * (1 - Math.pow(R, n)) / (1 - R)).toFixed(0)
            r = Sn <= Sx ? r - r / 2 : r + r / 2
            cnt++;
            if ((Sn - Sx < 1) || cnt > 100) { break; }
        }
        $result.value = (r).toFixed(3)
    } else {
        $result.value = (rate * 100).toFixed(1)
    }



}
// イベントを削除
inputElement.oninput = null;