
// var DEBUG = true;
var DEBUG = false;

function logging(msg) {
    if (DEBUG) console.log(msg);
};

function inherits(ctor, superCtor) {
    ctor._super = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurablt: true
        }
    });
};

/*
    ##    ##    ###    ##    ##    ###            ######## ##    ## ########  ######## 
    ##   ##    ## ##   ###   ##   ## ##              ##     ##  ##  ##     ## ##       
    ##  ##    ##   ##  ####  ##  ##   ##             ##      ####   ##     ## ##       
    #####    ##     ## ## ## ## ##     ##            ##       ##    ########  ######   
    ##  ##   ######### ##  #### #########            ##       ##    ##        ##       
    ##   ##  ##     ## ##   ### ##     ##            ##       ##    ##        ##       
    ##    ## ##     ## ##    ## ##     ## #######    ##       ##    ##        ######## 
*/

var KanaType = {
    SEION: "seion", DAKUON: "dakuon",HAN_DAKUON: "han dakuon",YOON: "yōon",LONG: "long",SOKUON: "sokuon"
};

/*
    ##    ##    ###    ##    ##    ###    
    ##   ##    ## ##   ###   ##   ## ##   
    ##  ##    ##   ##  ####  ##  ##   ##  
    #####    ##     ## ## ## ## ##     ## 
    ##  ##   ######### ##  #### ######### 
    ##   ##  ##     ## ##   ### ##     ## 
    ##    ## ##     ## ##    ## ##     ## 
*/

var Kana = function Kana(word, spell, kanaType) {
    this.word = word;
    this.spell = spell;
    this.kanaType = kanaType;
};

Kana.prototype.ShowKana = function() {
    return JSON.stringify(this);
};

Kana.prototype.GetTypeName = function() {
    return this.constructor.name;
};

function checkObjectIsKana(kana) {
    if (typeof(kana.GetTypeName) === 'function') {
        if (kana.GetTypeName() == "Kana")
            return true;
    }
    logging("Object is not a Kana: " + kana);
    return false;
};

/*
    ######## ##     ## ########  ######## ##    ##         ##    ##    ###    ##    ##    ###    
    ##       ###   ### ##     ##    ##     ##  ##          ##   ##    ## ##   ###   ##   ## ##   
    ##       #### #### ##     ##    ##      ####           ##  ##    ##   ##  ####  ##  ##   ##  
    ######   ## ### ## ########     ##       ##            #####    ##     ## ## ## ## ##     ## 
    ##       ##     ## ##           ##       ##            ##  ##   ######### ##  #### ######### 
    ##       ##     ## ##           ##       ##            ##   ##  ##     ## ##   ### ##     ## 
    ######## ##     ## ##           ##       ##    ####### ##    ## ##     ## ##    ## ##     ## 
*/
function EmptyKana() {
    EmptyKana._super.call(this);
    this.word = ".";
    this.spell = ".";
};

inherits(EmptyKana, Kana);

EmptyKana.prototype.GetTypeName = function() {
    return this.constructor.name;
};

function checkObjectIsEmptyKana(kana) {
    if (typeof(kana.GetTypeName) === 'function') {
        if (kana.GetTypeName() == "EmptyKana")
            return true;
    }
    logging("Object is not a EmptyKana: " + kana);
    return false;
};

/*
    ##    ##    ###    ##    ##    ###            ########   #######  ##      ## 
    ##   ##    ## ##   ###   ##   ## ##           ##     ## ##     ## ##  ##  ## 
    ##  ##    ##   ##  ####  ##  ##   ##          ##     ## ##     ## ##  ##  ## 
    #####    ##     ## ## ## ## ##     ##         ########  ##     ## ##  ##  ## 
    ##  ##   ######### ##  #### #########         ##   ##   ##     ## ##  ##  ## 
    ##   ##  ##     ## ##   ### ##     ##         ##    ##  ##     ## ##  ##  ## 
    ##    ## ##     ## ##    ## ##     ## ####### ##     ##  #######   ###  ###  
*/

var KanaRow = function KanaRow(kanaList, keySpell, kanaType) {
    if (kanaList instanceof Array) {
        this.kanaList = kanaList;
    } else {
        this.kanaList = new Array();
    }
    this.keySpell = keySpell;
    this.kanaType = kanaType;
};

KanaRow.prototype.AddKana = function(kana) {
    if (checkObjectIsKana(kana) || checkObjectIsEmptyKana(kana)) {
        this.kanaList.push(kana);
    }
};

KanaRow.prototype.GetTypeName = function() {
    return this.constructor.name;
};

function checkObjectIsKanaRow(kanaRow) {
    if (typeof(kanaRow.GetTypeName) === 'function') {
        if (kanaRow.GetTypeName() == "KanaRow")
            return true;
    }
    logging("Object is not a KanaRow: " + kanaRow);
    return false;
};

/*
    ##    ##    ###    ##    ##    ###            ########    ###    ########  ##       ######## 
    ##   ##    ## ##   ###   ##   ## ##              ##      ## ##   ##     ## ##       ##       
    ##  ##    ##   ##  ####  ##  ##   ##             ##     ##   ##  ##     ## ##       ##       
    #####    ##     ## ## ## ## ##     ##            ##    ##     ## ########  ##       ######   
    ##  ##   ######### ##  #### #########            ##    ######### ##     ## ##       ##       
    ##   ##  ##     ## ##   ### ##     ##            ##    ##     ## ##     ## ##       ##       
    ##    ## ##     ## ##    ## ##     ## #######    ##    ##     ## ########  ######## ######## 
*/

var KanaTable = function KanaTable() {
    this.kanaRowList = {};
};

KanaTable.prototype.AddKanaRow = function(kanaRow) {
    if (checkObjectIsKanaRow(kanaRow)) {
        this.kanaRowList[kanaRow.keySpell] = kanaRow;
    }
};

/*
    ##     ## #### ########     ###     ######      ###    ##    ##    ###    
    ##     ##  ##  ##     ##   ## ##   ##    ##    ## ##   ###   ##   ## ##   
    ##     ##  ##  ##     ##  ##   ##  ##         ##   ##  ####  ##  ##   ##  
    #########  ##  ########  ##     ## ##   #### ##     ## ## ## ## ##     ## 
    ##     ##  ##  ##   ##   ######### ##    ##  ######### ##  #### ######### 
    ##     ##  ##  ##    ##  ##     ## ##    ##  ##     ## ##   ### ##     ## 
    ##     ## #### ##     ## ##     ##  ######   ##     ## ##    ## ##     ##
*/

var hiraganaSeionTable = new KanaTable();
var hiraganaRow_A = new KanaRow(null, "a", KanaType.SEION);
hiraganaRow_A.AddKana(new Kana("あ", "a", KanaType.SEION));
hiraganaRow_A.AddKana(new Kana("い", "i", KanaType.SEION));
hiraganaRow_A.AddKana(new Kana("う", "u", KanaType.SEION));
hiraganaRow_A.AddKana(new Kana("え", "e", KanaType.SEION));
hiraganaRow_A.AddKana(new Kana("お", "o", KanaType.SEION));
var hiraganaRow_K = new KanaRow(null, "k", KanaType.SEION);
hiraganaRow_K.AddKana(new Kana("か", "ka", KanaType.SEION));
hiraganaRow_K.AddKana(new Kana("き", "ki", KanaType.SEION));
hiraganaRow_K.AddKana(new Kana("く", "ku", KanaType.SEION));
hiraganaRow_K.AddKana(new Kana("け", "ke", KanaType.SEION));
hiraganaRow_K.AddKana(new Kana("こ", "ko", KanaType.SEION));
var hiraganaRow_S = new KanaRow(null, "s", KanaType.SEION);
hiraganaRow_S.AddKana(new Kana("さ", "sa", KanaType.SEION));
hiraganaRow_S.AddKana(new Kana("し", "shi", KanaType.SEION));
hiraganaRow_S.AddKana(new Kana("す", "su", KanaType.SEION));
hiraganaRow_S.AddKana(new Kana("せ", "se", KanaType.SEION));
hiraganaRow_S.AddKana(new Kana("そ", "so", KanaType.SEION));
var hiraganaRow_N = new KanaRow(null, "n", KanaType.SEION);
hiraganaRow_N.AddKana(new Kana("な", "na", KanaType.SEION));
hiraganaRow_N.AddKana(new Kana("に", "ni", KanaType.SEION));
hiraganaRow_N.AddKana(new Kana("ぬ", "nu", KanaType.SEION));
hiraganaRow_N.AddKana(new Kana("ね", "ne", KanaType.SEION));
hiraganaRow_N.AddKana(new Kana("の", "no", KanaType.SEION));
var hiraganaRow_T = new KanaRow(null, "t", KanaType.SEION);
hiraganaRow_T.AddKana(new Kana("た", "ta", KanaType.SEION));
hiraganaRow_T.AddKana(new Kana("ち", "chi", KanaType.SEION));
hiraganaRow_T.AddKana(new Kana("つ", "tsu", KanaType.SEION));
hiraganaRow_T.AddKana(new Kana("て", "te", KanaType.SEION));
hiraganaRow_T.AddKana(new Kana("と", "to", KanaType.SEION));
var hiraganaRow_H = new KanaRow(null, "h", KanaType.SEION);
hiraganaRow_H.AddKana(new Kana("は", "ha", KanaType.SEION));
hiraganaRow_H.AddKana(new Kana("ひ", "hi", KanaType.SEION));
hiraganaRow_H.AddKana(new Kana("ふ", "fu", KanaType.SEION));
hiraganaRow_H.AddKana(new Kana("へ", "he", KanaType.SEION));
hiraganaRow_H.AddKana(new Kana("ほ", "ho", KanaType.SEION));
var hiraganaRow_M = new KanaRow(null, "m", KanaType.SEION);
hiraganaRow_M.AddKana(new Kana("ま", "ma", KanaType.SEION));
hiraganaRow_M.AddKana(new Kana("み", "mi", KanaType.SEION));
hiraganaRow_M.AddKana(new Kana("む", "mu", KanaType.SEION));
hiraganaRow_M.AddKana(new Kana("め", "me", KanaType.SEION));
hiraganaRow_M.AddKana(new Kana("も", "mo", KanaType.SEION));
var hiraganaRow_Y = new KanaRow(null, "y", KanaType.SEION);
hiraganaRow_Y.AddKana(new Kana("や", "ya", KanaType.SEION));
hiraganaRow_Y.AddKana(new EmptyKana());
hiraganaRow_Y.AddKana(new Kana("ゆ", "yu", KanaType.SEION));
hiraganaRow_Y.AddKana(new EmptyKana());
hiraganaRow_Y.AddKana(new Kana("よ", "yo", KanaType.SEION));
var hiraganaRow_R = new KanaRow(null, "r", KanaType.SEION);
hiraganaRow_R.AddKana(new Kana("ら", "ra", KanaType.SEION));
hiraganaRow_R.AddKana(new Kana("り", "ri", KanaType.SEION));
hiraganaRow_R.AddKana(new Kana("る", "ru", KanaType.SEION));
hiraganaRow_R.AddKana(new Kana("れ", "re", KanaType.SEION));
hiraganaRow_R.AddKana(new Kana("ろ", "ro", KanaType.SEION));
var hiraganaRow_W = new KanaRow(null, "w", KanaType.SEION);
hiraganaRow_W.AddKana(new Kana("わ", "wa", KanaType.SEION));
hiraganaRow_W.AddKana(new Kana("ゐ", "wi", KanaType.SEION));
hiraganaRow_W.AddKana(new EmptyKana());
hiraganaRow_W.AddKana(new Kana("ゑ", "we", KanaType.SEION));
hiraganaRow_W.AddKana(new Kana("を", "wo", KanaType.SEION));
var hiraganaRow_Other = new KanaRow(null, "-", KanaType.SEION);
hiraganaRow_Other.AddKana(new EmptyKana());
hiraganaRow_Other.AddKana(new EmptyKana());
hiraganaRow_Other.AddKana(new Kana("ん", "n", KanaType.SEION));
hiraganaRow_Other.AddKana(new EmptyKana());
hiraganaRow_Other.AddKana(new Kana("を", "o", KanaType.SEION));
hiraganaSeionTable.AddKanaRow(hiraganaRow_A);
hiraganaSeionTable.AddKanaRow(hiraganaRow_K);
hiraganaSeionTable.AddKanaRow(hiraganaRow_S);
hiraganaSeionTable.AddKanaRow(hiraganaRow_T);
hiraganaSeionTable.AddKanaRow(hiraganaRow_N);
hiraganaSeionTable.AddKanaRow(hiraganaRow_H);
hiraganaSeionTable.AddKanaRow(hiraganaRow_M);
hiraganaSeionTable.AddKanaRow(hiraganaRow_Y);
hiraganaSeionTable.AddKanaRow(hiraganaRow_R);
hiraganaSeionTable.AddKanaRow(hiraganaRow_W);
hiraganaSeionTable.AddKanaRow(hiraganaRow_Other);

var hiraganaDakuonTable = new KanaTable();
var hiraganaRow_G = new KanaRow(null, "g", KanaType.DAKUON);
hiraganaRow_G.AddKana(new Kana("が", "ga", KanaType.DAKUON));
hiraganaRow_G.AddKana(new Kana("ぎ", "gi", KanaType.DAKUON));
hiraganaRow_G.AddKana(new Kana("ぐ", "gu", KanaType.DAKUON));
hiraganaRow_G.AddKana(new Kana("げ", "ge", KanaType.DAKUON));
hiraganaRow_G.AddKana(new Kana("ご", "go", KanaType.DAKUON));
var hiraganaRow_Z = new KanaRow(null, "z", KanaType.DAKUON);
hiraganaRow_Z.AddKana(new Kana("ざ", "za", KanaType.DAKUON));
hiraganaRow_Z.AddKana(new Kana("じ", "zi", KanaType.DAKUON));
hiraganaRow_Z.AddKana(new Kana("ず", "zu", KanaType.DAKUON));
hiraganaRow_Z.AddKana(new Kana("ぜ", "ze", KanaType.DAKUON));
hiraganaRow_Z.AddKana(new Kana("ぞ", "zo", KanaType.DAKUON));
var hiraganaRow_D = new KanaRow(null, "d", KanaType.DAKUON);
hiraganaRow_D.AddKana(new Kana("だ", "da", KanaType.DAKUON));
hiraganaRow_D.AddKana(new Kana("ぢ", "ji", KanaType.DAKUON));
hiraganaRow_D.AddKana(new Kana("づ", "zu", KanaType.DAKUON));
hiraganaRow_D.AddKana(new Kana("で", "de", KanaType.DAKUON));
hiraganaRow_D.AddKana(new Kana("ど", "do", KanaType.DAKUON));
var hiraganaRow_B = new KanaRow(null, "b", KanaType.DAKUON);
hiraganaRow_B.AddKana(new Kana("ば", "ba", KanaType.DAKUON));
hiraganaRow_B.AddKana(new Kana("び", "bi", KanaType.DAKUON));
hiraganaRow_B.AddKana(new Kana("ぶ", "bu", KanaType.DAKUON));
hiraganaRow_B.AddKana(new Kana("べ", "be", KanaType.DAKUON));
hiraganaRow_B.AddKana(new Kana("ぼ", "bo", KanaType.DAKUON));
var hiraganaRow_P = new KanaRow(null, "p", KanaType.HAN_DAKUON);
hiraganaRow_P.AddKana(new Kana("ぱ", "pa", KanaType.HAN_DAKUON));
hiraganaRow_P.AddKana(new Kana("ぴ", "pi", KanaType.HAN_DAKUON));
hiraganaRow_P.AddKana(new Kana("ぷ", "pu", KanaType.HAN_DAKUON));
hiraganaRow_P.AddKana(new Kana("ぺ", "pe", KanaType.HAN_DAKUON));
hiraganaRow_P.AddKana(new Kana("ぽ", "po", KanaType.HAN_DAKUON));
var hiraganaRow_Long = new KanaRow(null, "-", KanaType.SOKUON);
hiraganaRow_Long.AddKana(new Kana("っ", "-", KanaType.SOKUON));
hiraganaDakuonTable.AddKanaRow(hiraganaRow_G);
hiraganaDakuonTable.AddKanaRow(hiraganaRow_Z);
hiraganaDakuonTable.AddKanaRow(hiraganaRow_D);
hiraganaDakuonTable.AddKanaRow(hiraganaRow_B);
hiraganaDakuonTable.AddKanaRow(hiraganaRow_P);
hiraganaDakuonTable.AddKanaRow(hiraganaRow_Long);

var hiraganaYoonTable = new KanaTable();
var hiraganaRow_KY = new KanaRow(null, "k", KanaType.DAKUON);
hiraganaRow_KY.AddKana(new Kana("きゃ", "kya", KanaType.YOON));
hiraganaRow_KY.AddKana(new Kana("きゅ", "kyu", KanaType.YOON));
hiraganaRow_KY.AddKana(new Kana("きょ", "kyo", KanaType.YOON));
var hiraganaRow_GY = new KanaRow(null, "g", KanaType.YOON);
hiraganaRow_GY.AddKana(new Kana("ぎゃ", "gya", KanaType.YOON));
hiraganaRow_GY.AddKana(new Kana("ぎゅ", "gyu", KanaType.YOON));
hiraganaRow_GY.AddKana(new Kana("ぎょ", "gyo", KanaType.YOON));
var hiraganaRow_SY = new KanaRow(null, "s", KanaType.YOON);
hiraganaRow_SY.AddKana(new Kana("しゃ", "sha", KanaType.YOON));
hiraganaRow_SY.AddKana(new Kana("しゅ", "shu", KanaType.YOON));
hiraganaRow_SY.AddKana(new Kana("しょ", "sho", KanaType.YOON));
var hiraganaRow_ZY = new KanaRow(null, "z", KanaType.YOON);
hiraganaRow_ZY.AddKana(new Kana("じゃ", "zya", KanaType.YOON));
hiraganaRow_ZY.AddKana(new Kana("じゅ", "zyu", KanaType.YOON));
hiraganaRow_ZY.AddKana(new Kana("じょ", "zyo", KanaType.YOON));
var hiraganaRow_CY = new KanaRow(null, "c", KanaType.YOON);
hiraganaRow_CY.AddKana(new Kana("ちゃ", "cha", KanaType.YOON));
hiraganaRow_CY.AddKana(new Kana("ちゅ", "chu", KanaType.YOON));
hiraganaRow_CY.AddKana(new Kana("ちょ", "cho", KanaType.YOON));
var hiraganaRow_JY = new KanaRow(null, "j", KanaType.YOON);
hiraganaRow_JY.AddKana(new Kana("ぢゃ", "ja", KanaType.YOON));
hiraganaRow_JY.AddKana(new Kana("ぢゅ", "ju", KanaType.YOON));
hiraganaRow_JY.AddKana(new Kana("ぢょ", "jo", KanaType.YOON));
var hiraganaRow_NY = new KanaRow(null, "n", KanaType.YOON);
hiraganaRow_NY.AddKana(new Kana("にゃ", "nya", KanaType.YOON));
hiraganaRow_NY.AddKana(new Kana("にゅ", "nyu", KanaType.YOON));
hiraganaRow_NY.AddKana(new Kana("にょ", "nyo", KanaType.YOON));
var hiraganaRow_HY = new KanaRow(null, "h", KanaType.YOON);
hiraganaRow_HY.AddKana(new Kana("ひゃ", "hya", KanaType.YOON));
hiraganaRow_HY.AddKana(new Kana("ひゅ", "hyu", KanaType.YOON));
hiraganaRow_HY.AddKana(new Kana("ひょ", "hyo", KanaType.YOON));
var hiraganaRow_BY = new KanaRow(null, "b", KanaType.YOON);
hiraganaRow_BY.AddKana(new Kana("びゃ", "bya", KanaType.YOON));
hiraganaRow_BY.AddKana(new Kana("びゅ", "byu", KanaType.YOON));
hiraganaRow_BY.AddKana(new Kana("びょ", "byo", KanaType.YOON));
var hiraganaRow_PY = new KanaRow(null, "p", KanaType.YOON);
hiraganaRow_PY.AddKana(new Kana("ぴゃ", "pya", KanaType.YOON));
hiraganaRow_PY.AddKana(new Kana("ぴゅ", "pyu", KanaType.YOON));
hiraganaRow_PY.AddKana(new Kana("ぴょ", "pyo", KanaType.YOON));
var hiraganaRow_MY = new KanaRow(null, "m", KanaType.YOON);
hiraganaRow_MY.AddKana(new Kana("みゃ", "mya", KanaType.YOON));
hiraganaRow_MY.AddKana(new Kana("みゅ", "myu", KanaType.YOON));
hiraganaRow_MY.AddKana(new Kana("みょ", "myo", KanaType.YOON));
var hiraganaRow_RY = new KanaRow(null, "r", KanaType.YOON);
hiraganaRow_RY.AddKana(new Kana("りゃ", "rya", KanaType.YOON));
hiraganaRow_RY.AddKana(new Kana("りゅ", "ryu", KanaType.YOON));
hiraganaRow_RY.AddKana(new Kana("りょ", "ryo", KanaType.YOON));
hiraganaYoonTable.AddKanaRow(hiraganaRow_KY);
hiraganaYoonTable.AddKanaRow(hiraganaRow_GY);
hiraganaYoonTable.AddKanaRow(hiraganaRow_SY);
hiraganaYoonTable.AddKanaRow(hiraganaRow_ZY);
hiraganaYoonTable.AddKanaRow(hiraganaRow_CY);
hiraganaYoonTable.AddKanaRow(hiraganaRow_JY);
hiraganaYoonTable.AddKanaRow(hiraganaRow_NY);
hiraganaYoonTable.AddKanaRow(hiraganaRow_HY);
hiraganaYoonTable.AddKanaRow(hiraganaRow_BY);
hiraganaYoonTable.AddKanaRow(hiraganaRow_PY);
hiraganaYoonTable.AddKanaRow(hiraganaRow_MY);
hiraganaYoonTable.AddKanaRow(hiraganaRow_RY);

/*
    ##    ##    ###    ########    ###    ##    ##    ###    ##    ##    ###    
    ##   ##    ## ##      ##      ## ##   ##   ##    ## ##   ###   ##   ## ##   
    ##  ##    ##   ##     ##     ##   ##  ##  ##    ##   ##  ####  ##  ##   ##  
    #####    ##     ##    ##    ##     ## #####    ##     ## ## ## ## ##     ## 
    ##  ##   #########    ##    ######### ##  ##   ######### ##  #### ######### 
    ##   ##  ##     ##    ##    ##     ## ##   ##  ##     ## ##   ### ##     ## 
    ##    ## ##     ##    ##    ##     ## ##    ## ##     ## ##    ## ##     ##
*/

var katakanaSeionTable = new KanaTable();
var katakanaRow_A = new KanaRow(null, "a", KanaType.SEION);
katakanaRow_A.AddKana(new Kana("ア", "a", KanaType.SEION));
katakanaRow_A.AddKana(new Kana("イ", "i", KanaType.SEION));
katakanaRow_A.AddKana(new Kana("ウ", "u", KanaType.SEION));
katakanaRow_A.AddKana(new Kana("エ", "e", KanaType.SEION));
katakanaRow_A.AddKana(new Kana("オ", "o", KanaType.SEION));
var katakanaRow_K = new KanaRow(null, "k", KanaType.SEION);
katakanaRow_K.AddKana(new Kana("カ", "ka", KanaType.SEION));
katakanaRow_K.AddKana(new Kana("キ", "ki", KanaType.SEION));
katakanaRow_K.AddKana(new Kana("ク", "ku", KanaType.SEION));
katakanaRow_K.AddKana(new Kana("ケ", "ke", KanaType.SEION));
katakanaRow_K.AddKana(new Kana("コ", "ko", KanaType.SEION));
var katakanaRow_S = new KanaRow(null, "s", KanaType.SEION);
katakanaRow_S.AddKana(new Kana("サ", "sa", KanaType.SEION));
katakanaRow_S.AddKana(new Kana("シ", "shi", KanaType.SEION));
katakanaRow_S.AddKana(new Kana("ス", "su", KanaType.SEION));
katakanaRow_S.AddKana(new Kana("セ", "se", KanaType.SEION));
katakanaRow_S.AddKana(new Kana("ソ", "so", KanaType.SEION));
var katakanaRow_N = new KanaRow(null, "n", KanaType.SEION);
katakanaRow_N.AddKana(new Kana("ナ", "na", KanaType.SEION));
katakanaRow_N.AddKana(new Kana("ニ", "ni", KanaType.SEION));
katakanaRow_N.AddKana(new Kana("ヌ", "nu", KanaType.SEION));
katakanaRow_N.AddKana(new Kana("ネ", "ne", KanaType.SEION));
katakanaRow_N.AddKana(new Kana("ノ", "no", KanaType.SEION));
var katakanaRow_T = new KanaRow(null, "t", KanaType.SEION);
katakanaRow_T.AddKana(new Kana("タ", "ta", KanaType.SEION));
katakanaRow_T.AddKana(new Kana("チ", "chi", KanaType.SEION));
katakanaRow_T.AddKana(new Kana("ツ", "tsu", KanaType.SEION));
katakanaRow_T.AddKana(new Kana("テ", "te", KanaType.SEION));
katakanaRow_T.AddKana(new Kana("ト", "to", KanaType.SEION));
var katakanaRow_H = new KanaRow(null, "h", KanaType.SEION);
katakanaRow_H.AddKana(new Kana("ハ", "ha", KanaType.SEION));
katakanaRow_H.AddKana(new Kana("ヒ", "hi", KanaType.SEION));
katakanaRow_H.AddKana(new Kana("フ", "fu", KanaType.SEION));
katakanaRow_H.AddKana(new Kana("ヘ", "he", KanaType.SEION));
katakanaRow_H.AddKana(new Kana("ホ", "ho", KanaType.SEION));
var katakanaRow_M = new KanaRow(null, "m", KanaType.SEION);
katakanaRow_M.AddKana(new Kana("マ", "ma", KanaType.SEION));
katakanaRow_M.AddKana(new Kana("ミ", "mi", KanaType.SEION));
katakanaRow_M.AddKana(new Kana("ム", "mu", KanaType.SEION));
katakanaRow_M.AddKana(new Kana("メ", "me", KanaType.SEION));
katakanaRow_M.AddKana(new Kana("モ", "mo", KanaType.SEION));
var katakanaRow_Y = new KanaRow(null, "y", KanaType.SEION);
katakanaRow_Y.AddKana(new Kana("ヤ", "ya", KanaType.SEION));
katakanaRow_Y.AddKana(new EmptyKana());
katakanaRow_Y.AddKana(new Kana("ユ", "yu", KanaType.SEION));
katakanaRow_Y.AddKana(new EmptyKana());
katakanaRow_Y.AddKana(new Kana("ヨ", "yo", KanaType.SEION));
var katakanaRow_R = new KanaRow(null, "r", KanaType.SEION);
katakanaRow_R.AddKana(new Kana("ラ", "ra", KanaType.SEION));
katakanaRow_R.AddKana(new Kana("リ", "ri", KanaType.SEION));
katakanaRow_R.AddKana(new Kana("ル", "ru", KanaType.SEION));
katakanaRow_R.AddKana(new Kana("レ", "re", KanaType.SEION));
katakanaRow_R.AddKana(new Kana("ロ", "ro", KanaType.SEION));
var katakanaRow_W = new KanaRow(null, "w", KanaType.SEION);
katakanaRow_W.AddKana(new Kana("ワ", "wa", KanaType.SEION));
katakanaRow_W.AddKana(new Kana("ヰ", "wi", KanaType.SEION));
katakanaRow_W.AddKana(new EmptyKana());
katakanaRow_W.AddKana(new Kana("ヱ", "we", KanaType.SEION));
katakanaRow_W.AddKana(new Kana("ヲ", "wo", KanaType.SEION));
var katakanaRow_Other = new KanaRow(null, "-", KanaType.SEION);
katakanaRow_Other.AddKana(new EmptyKana());
katakanaRow_Other.AddKana(new EmptyKana());
katakanaRow_Other.AddKana(new Kana("ン", "n", KanaType.SEION));
katakanaRow_Other.AddKana(new EmptyKana());
katakanaRow_Other.AddKana(new Kana("ヲ", "o", KanaType.SEION));
katakanaSeionTable.AddKanaRow(katakanaRow_A);
katakanaSeionTable.AddKanaRow(katakanaRow_K);
katakanaSeionTable.AddKanaRow(katakanaRow_S);
katakanaSeionTable.AddKanaRow(katakanaRow_T);
katakanaSeionTable.AddKanaRow(katakanaRow_N);
katakanaSeionTable.AddKanaRow(katakanaRow_H);
katakanaSeionTable.AddKanaRow(katakanaRow_M);
katakanaSeionTable.AddKanaRow(katakanaRow_Y);
katakanaSeionTable.AddKanaRow(katakanaRow_R);
katakanaSeionTable.AddKanaRow(katakanaRow_W);
katakanaSeionTable.AddKanaRow(katakanaRow_Other);

var katakanaDakuonTable = new KanaTable();
var katakanaRow_G = new KanaRow(null, "g", KanaType.DAKUON);
katakanaRow_G.AddKana(new Kana("ガ", "ga", KanaType.DAKUON));
katakanaRow_G.AddKana(new Kana("ギ", "gi", KanaType.DAKUON));
katakanaRow_G.AddKana(new Kana("グ", "gu", KanaType.DAKUON));
katakanaRow_G.AddKana(new Kana("ゲ", "ge", KanaType.DAKUON));
katakanaRow_G.AddKana(new Kana("ゴ", "go", KanaType.DAKUON));
var katakanaRow_Z = new KanaRow(null, "z", KanaType.DAKUON);
katakanaRow_Z.AddKana(new Kana("ザ", "za", KanaType.DAKUON));
katakanaRow_Z.AddKana(new Kana("ジ", "zi", KanaType.DAKUON));
katakanaRow_Z.AddKana(new Kana("ズ", "zu", KanaType.DAKUON));
katakanaRow_Z.AddKana(new Kana("ゼ", "ze", KanaType.DAKUON));
katakanaRow_Z.AddKana(new Kana("ゾ", "zo", KanaType.DAKUON));
var katakanaRow_D = new KanaRow(null, "d", KanaType.DAKUON);
katakanaRow_D.AddKana(new Kana("ダ", "da", KanaType.DAKUON));
katakanaRow_D.AddKana(new Kana("ヂ", "ji", KanaType.DAKUON));
katakanaRow_D.AddKana(new Kana("ヅ", "zu", KanaType.DAKUON));
katakanaRow_D.AddKana(new Kana("デ", "de", KanaType.DAKUON));
katakanaRow_D.AddKana(new Kana("ド", "do", KanaType.DAKUON));
var katakanaRow_B = new KanaRow(null, "b", KanaType.DAKUON);
katakanaRow_B.AddKana(new Kana("バ", "ba", KanaType.DAKUON));
katakanaRow_B.AddKana(new Kana("ビ", "bi", KanaType.DAKUON));
katakanaRow_B.AddKana(new Kana("ブ", "bu", KanaType.DAKUON));
katakanaRow_B.AddKana(new Kana("ベ", "be", KanaType.DAKUON));
katakanaRow_B.AddKana(new Kana("ボ", "bo", KanaType.DAKUON));
var katakanaRow_P = new KanaRow(null, "p", KanaType.HAN_DAKUON);
katakanaRow_P.AddKana(new Kana("パ", "pa", KanaType.HAN_DAKUON));
katakanaRow_P.AddKana(new Kana("ピ", "pi", KanaType.HAN_DAKUON));
katakanaRow_P.AddKana(new Kana("プ", "pu", KanaType.HAN_DAKUON));
katakanaRow_P.AddKana(new Kana("ペ", "pe", KanaType.HAN_DAKUON));
katakanaRow_P.AddKana(new Kana("ポ", "po", KanaType.HAN_DAKUON));
var katakanaRow_Long = new KanaRow(null, "-", KanaType.SOKUON);
katakanaRow_Long.AddKana(new Kana("ッ", "*", KanaType.SOKUON));
katakanaDakuonTable.AddKanaRow(katakanaRow_G);
katakanaDakuonTable.AddKanaRow(katakanaRow_Z);
katakanaDakuonTable.AddKanaRow(katakanaRow_D);
katakanaDakuonTable.AddKanaRow(katakanaRow_B);
katakanaDakuonTable.AddKanaRow(katakanaRow_P);
katakanaDakuonTable.AddKanaRow(katakanaRow_Long);

var katakanaYoonTable = new KanaTable();
var katakanaRow_KY = new KanaRow(null, "k", KanaType.DAKUON);
katakanaRow_KY.AddKana(new Kana("キャ", "kya", KanaType.YOON));
katakanaRow_KY.AddKana(new Kana("キュ", "kyu", KanaType.YOON));
katakanaRow_KY.AddKana(new Kana("キョ", "kyo", KanaType.YOON));
var katakanaRow_GY = new KanaRow(null, "g", KanaType.YOON);
katakanaRow_GY.AddKana(new Kana("ギャ", "gya", KanaType.YOON));
katakanaRow_GY.AddKana(new Kana("ギュ", "gyu", KanaType.YOON));
katakanaRow_GY.AddKana(new Kana("ギョ", "gyo", KanaType.YOON));
var katakanaRow_SY = new KanaRow(null, "s", KanaType.YOON);
katakanaRow_SY.AddKana(new Kana("シャ", "sha", KanaType.YOON));
katakanaRow_SY.AddKana(new Kana("シュ", "shu", KanaType.YOON));
katakanaRow_SY.AddKana(new Kana("ショ", "sho", KanaType.YOON));
var katakanaRow_ZY = new KanaRow(null, "z", KanaType.YOON);
katakanaRow_ZY.AddKana(new Kana("ジャ", "zya", KanaType.YOON));
katakanaRow_ZY.AddKana(new Kana("ジュ", "zyu", KanaType.YOON));
katakanaRow_ZY.AddKana(new Kana("ジョ", "zyo", KanaType.YOON));
var katakanaRow_CY = new KanaRow(null, "c", KanaType.YOON);
katakanaRow_CY.AddKana(new Kana("チャ", "cha", KanaType.YOON));
katakanaRow_CY.AddKana(new Kana("チュ", "chu", KanaType.YOON));
katakanaRow_CY.AddKana(new Kana("チョ", "cho", KanaType.YOON));
var katakanaRow_JY = new KanaRow(null, "j", KanaType.YOON);
katakanaRow_JY.AddKana(new Kana("ヂャ", "ja", KanaType.YOON));
katakanaRow_JY.AddKana(new Kana("ヂュ", "ju", KanaType.YOON));
katakanaRow_JY.AddKana(new Kana("ヂョ", "jo", KanaType.YOON));
var katakanaRow_NY = new KanaRow(null, "n", KanaType.YOON);
katakanaRow_NY.AddKana(new Kana("ニャ", "nya", KanaType.YOON));
katakanaRow_NY.AddKana(new Kana("ニュ", "nyu", KanaType.YOON));
katakanaRow_NY.AddKana(new Kana("ニョ", "nyo", KanaType.YOON));
var katakanaRow_HY = new KanaRow(null, "h", KanaType.YOON);
katakanaRow_HY.AddKana(new Kana("ヒャ", "hya", KanaType.YOON));
katakanaRow_HY.AddKana(new Kana("ヒュ", "hyu", KanaType.YOON));
katakanaRow_HY.AddKana(new Kana("ヒョ", "hyo", KanaType.YOON));
var katakanaRow_BY = new KanaRow(null, "b", KanaType.YOON);
katakanaRow_BY.AddKana(new Kana("ビャ", "bya", KanaType.YOON));
katakanaRow_BY.AddKana(new Kana("ビュ", "byu", KanaType.YOON));
katakanaRow_BY.AddKana(new Kana("ビョ", "byo", KanaType.YOON));
var katakanaRow_PY = new KanaRow(null, "p", KanaType.YOON);
katakanaRow_PY.AddKana(new Kana("ピャ", "pya", KanaType.YOON));
katakanaRow_PY.AddKana(new Kana("ピュ", "pyu", KanaType.YOON));
katakanaRow_PY.AddKana(new Kana("ピョ", "pyo", KanaType.YOON));
var katakanaRow_MY = new KanaRow(null, "m", KanaType.YOON);
katakanaRow_MY.AddKana(new Kana("ミャ", "mya", KanaType.YOON));
katakanaRow_MY.AddKana(new Kana("ミュ", "myu", KanaType.YOON));
katakanaRow_MY.AddKana(new Kana("ミョ", "myo", KanaType.YOON));
var katakanaRow_RY = new KanaRow(null, "r", KanaType.YOON);
katakanaRow_RY.AddKana(new Kana("リャ", "rya", KanaType.YOON));
katakanaRow_RY.AddKana(new Kana("リュ", "ryu", KanaType.YOON));
katakanaRow_RY.AddKana(new Kana("リョ", "ryo", KanaType.YOON));

katakanaYoonTable.AddKanaRow(katakanaRow_KY);
katakanaYoonTable.AddKanaRow(katakanaRow_GY);
katakanaYoonTable.AddKanaRow(katakanaRow_SY);
katakanaYoonTable.AddKanaRow(katakanaRow_ZY);
katakanaYoonTable.AddKanaRow(katakanaRow_CY);
katakanaYoonTable.AddKanaRow(katakanaRow_JY);
katakanaYoonTable.AddKanaRow(katakanaRow_NY);
katakanaYoonTable.AddKanaRow(katakanaRow_HY);
katakanaYoonTable.AddKanaRow(katakanaRow_BY);
katakanaYoonTable.AddKanaRow(katakanaRow_PY);
katakanaYoonTable.AddKanaRow(katakanaRow_MY);
katakanaYoonTable.AddKanaRow(katakanaRow_RY);

