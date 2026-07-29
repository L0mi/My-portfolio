// ════════════════════════════════════════════════════════════
// DIALEKTO — TRANSLATION ENGINE
// ════════════════════════════════════════════════════════════

// ── PHRASE DICTIONARY ─────────────────────────────────────
// Key: canonical English phrase (case-sensitive, exact match)
// Each language maps to the translation in that dialect.
// "English" key is the English phrase itself.

const DIALECTS = ['English', 'Tagalog', 'Cebuano', 'Ilocano', 'Waray', 'Kapampangan', 'Hiligaynon'];

const PHRASES = [
    // ── GREETINGS ──────────────────────────────────────────
    {
        English: 'Hello',
        Tagalog: 'Kumusta',
        Cebuano: 'Kumusta',
        Ilocano: 'Kablaaw',
        Waray: 'Kumusta',
        Kapampangan: 'Kumusta',
        Hiligaynon: 'Kumusta'
    },
    {
        English: 'Good morning',
        Tagalog: 'Magandang umaga',
        Cebuano: 'Maayong buntag',
        Ilocano: 'Naimbag a bigat',
        Waray: 'Maupay nga aga',
        Kapampangan: 'Mayap a yabak',
        Hiligaynon: 'Maayo nga aga'
    },
    {
        English: 'Good afternoon',
        Tagalog: 'Magandang hapon',
        Cebuano: 'Maayong hapon',
        Ilocano: 'Naimbag a malem',
        Waray: 'Maupay nga kulop',
        Kapampangan: 'Mayap a gatpanapun',
        Hiligaynon: 'Maayo nga hapon'
    },
    {
        English: 'Good evening',
        Tagalog: 'Magandang gabi',
        Cebuano: 'Maayong gabii',
        Ilocano: 'Naimbag a rabii',
        Waray: 'Maupay nga gab-i',
        Kapampangan: 'Mayap a bengi',
        Hiligaynon: 'Maayo nga gab-i'
    },
    {
        English: 'Thank you',
        Tagalog: 'Salamat',
        Cebuano: 'Salamat',
        Ilocano: 'Agyamanak',
        Waray: 'Salamat',
        Kapampangan: 'Dakal a salamat',
        Hiligaynon: 'Salamat'
    },
    // ── BASIC CONVERSATION ─────────────────────────────────
    {
        English: 'My name is ___.',
        Tagalog: 'Ang pangalan ko ay ___.',
        Cebuano: 'Ang akong ngalan si ___.',
        Ilocano: 'Siak ni ___.',
        Waray: 'Ako hi ___.',
        Kapampangan: 'Yaku i ___.',
        Hiligaynon: 'Ang pangalan ko ay si ___.'
    },
    {
        English: 'Can you help me?',
        Tagalog: 'Maaari mo ba akong tulungan?',
        Cebuano: 'Mahimo bang ikaw motabang kanako?',
        Ilocano: 'Mabalin mo kuma nga tulongannak?',
        Waray: 'Makakabulig ka ba ha akon?',
        Kapampangan: 'Mapagsinan mo na ku?',
        Hiligaynon: 'Makabulig ka ba sa akon?'
    },
    // ── DIRECTIONS ────────────────────────────────────────
    {
        English: 'Where is the bus stop?',
        Tagalog: 'Nasaan ang hintayan ng bus?',
        Cebuano: 'Asa ang hintayan sa bus?',
        Ilocano: 'Sadinno ti pagbabaanna daytoy a bus?',
        Waray: 'Hain an tigtiraan han bus?',
        Kapampangan: 'Ninu ing hintayan ning bus?',
        Hiligaynon: 'Diin ang hintayan sang bus?'
    },
    {
        English: 'How do I get there?',
        Tagalog: 'Paano ako makakarating doon?',
        Cebuano: 'Unsaon nako pagadto didto?',
        Ilocano: 'Kasano nga makaadaak idiay?',
        Waray: 'Paano ako makakabot didto?',
        Kapampangan: 'Makananu ku makaratung duman?',
        Hiligaynon: 'Paano ko maabot didto?'
    },
    // ── TRANSPORTATION ────────────────────────────────────
    {
        English: 'How much is the fare?',
        Tagalog: 'Magkano ang pamasahe?',
        Cebuano: 'Pila ang pamasahe?',
        Ilocano: 'Mano ti pamasahe?',
        Waray: 'Pira an pamasahe?',
        Kapampangan: 'Magkanu ing pamasahi?',
        Hiligaynon: 'Tagpila ang pamasahe?'
    },
    {
        English: 'Can you take me here?',
        Tagalog: 'Maaari mo akong dalhin dito?',
        Cebuano: 'Mahimo bang dad-on mo ako dinhi?',
        Ilocano: 'Mabalinmo nga isakay nak ditoy?',
        Waray: 'Maaari mo ba ako dad-on dinhi?',
        Kapampangan: 'Malyari mung dalang aku keni?',
        Hiligaynon: 'Pwede mo ako dal-on diri?'
    },
    // ── FOOD AND RESTAURANTS ──────────────────────────────
    {
        English: 'What do you recommend?',
        Tagalog: 'Ano ang iyong irerekomenda?',
        Cebuano: 'Unsa ang imong irekomenda?',
        Ilocano: 'Ania ti ipapalagipmo?',
        Waray: 'Ano an imo irerekomenda?',
        Kapampangan: 'Nanu ing irerekomenda mu?',
        Hiligaynon: 'Ano ang imo irekomenda?'
    },
    {
        English: 'I would like to order.',
        Tagalog: 'Gusto kong mag-order.',
        Cebuano: 'Gusto nakong mag-order.',
        Ilocano: 'Kayatko ti mag-order.',
        Waray: 'Karuyag ko mag-order.',
        Kapampangan: 'Buri kung mag-order.',
        Hiligaynon: 'Gusto ko mag-order.'
    },
    // ── SHOPPING AND MARKETS ──────────────────────────────
    {
        English: 'How much is this?',
        Tagalog: 'Magkano ito?',
        Cebuano: 'Pila man kini?',
        Ilocano: 'Sagmamano daytoy?',
        Waray: 'Pira ini?',
        Kapampangan: 'Magkanu iti?',
        Hiligaynon: 'Tagpila ini?'
    },
    {
        English: 'Can I get a discount?',
        Tagalog: 'Pwede bang may diskwento?',
        Cebuano: 'Pwede bang makakuha ug diskwento?',
        Ilocano: 'Awan tawar nan?',
        Waray: 'Pwede ba nga makakuha hin diskwento?',
        Kapampangan: 'Malyari bang maki diskwento?',
        Hiligaynon: 'Pwede ba ako sing diskwento?'
    },
];

// ── BUILD REVERSE LOOKUP MAP ──────────────────────────────
// translationMap[srcLang][tgtLang][phrase] = translation
const translationMap = {};

DIALECTS.forEach(src => {
    translationMap[src] = {};
    DIALECTS.forEach(tgt => {
        translationMap[src][tgt] = {};
    });
});

PHRASES.forEach(entry => {
    DIALECTS.forEach(src => {
        DIALECTS.forEach(tgt => {
            if (src === tgt) return;
            const srcPhrase = entry[src];
            const tgtPhrase = entry[tgt];
            if (srcPhrase && tgtPhrase) {
                translationMap[src][tgt][srcPhrase] = tgtPhrase;
            }
        });
    });
});

// ── AUDIO MAPS ─────────────────────────────────────────────
// Generic (language-agnostic) audio fallback, keyed by English phrase.
const translationAudioMap = {
    'Hello': './assets/audio/hello.mp3',
    'Good morning': './assets/audio/good_morning.mp3',
    'Good afternoon': './assets/audio/good_afternoon.mp3',
    'Good evening': './assets/audio/good_evening.mp3',
    'Thank you': './assets/audio/thank_you.mp3',
    'My name is ___.': './assets/audio/my_name_is.mp3',
    'Can you help me?': './assets/audio/can_you_help_me.mp3',
    'Where is the bus stop?': './assets/audio/where_is_the_bus_stop.mp3',
    'How do I get there?': './assets/audio/how_do_i_get_there.mp3',
    'How much is the fare?': './assets/audio/how_much_is_the_fare.mp3',
    'Can you take me here?': './assets/audio/can_you_take_me_here.mp3',
    'What do you recommend?': './assets/audio/what_do_you_recommend.mp3',
    'I would like to order.': './assets/audio/i_would_like_to_order.mp3',
    'How much is this?': './assets/audio/how_much_is_this.mp3',
    'Can I get a discount?': './assets/audio/can_i_get_a_discount.mp3'
};

// Per-language, per-phrase audio map. Place audio files under assets/audio/{language}/{file}.mp3
// Keyed by the same canonical English phrase used in PHRASES, so it works
// no matter which language the person is translating into.
const localizedAudioMap = {
    'Cebuano': {
        'Hello': './assets/audio/cebuano/hello.mp3',
        'Good morning': './assets/audio/cebuano/good_morning.mp3',
        'Good afternoon': './assets/audio/cebuano/good_afternoon.mp3',
        'Good evening': './assets/audio/cebuano/good_evening.mp3',
        'Thank you': './assets/audio/cebuano/thank_you.mp3',
        'My name is ___.': './assets/audio/cebuano/my_name_is.mp3',
        'Can you help me?': './assets/audio/cebuano/can_you_help_me.mp3',
        'Where is the bus stop?': './assets/audio/cebuano/where_is_the_bus_stop.mp3',
        'How do I get there?': './assets/audio/cebuano/how_do_i_get_there.mp3',
        'How much is the fare?': './assets/audio/cebuano/how_much_is_the_fare.mp3',
        'Can you take me here?': './assets/audio/cebuano/can_you_take_me_here.mp3',
        'What do you recommend?': './assets/audio/cebuano/what_do_you_recommend.mp3',
        'I would like to order.': './assets/audio/cebuano/i_would_like_to_order.mp3',
        'How much is this?': './assets/audio/cebuano/how_much_is_this.mp3',
        'Can I get a discount?': './assets/audio/cebuano/can_i_get_a_discount.mp3'
    },
    'Tagalog': {
        'Hello': './assets/audio/tagalog/hello.mp3',
        'Good morning': './assets/audio/tagalog/good_morning.mp3',
        'Good afternoon': './assets/audio/tagalog/good_afternoon.mp3',
        'Good evening': './assets/audio/tagalog/good_evening.mp3',
        'Thank you': './assets/audio/tagalog/thank_you.mp3',
        'My name is ___.': './assets/audio/tagalog/my_name_is.mp3',
        'Can you help me?': './assets/audio/tagalog/can_you_help_me.mp3',
        'Where is the bus stop?': './assets/audio/tagalog/where_is_the_bus_stop.mp3',
        'How do I get there?': './assets/audio/tagalog/how_do_i_get_there.mp3',
        'How much is the fare?': './assets/audio/tagalog/how_much_is_the_fare.mp3',
        'Can you take me here?': './assets/audio/tagalog/can_you_take_me_here.mp3',
        'What do you recommend?': './assets/audio/tagalog/what_do_you_recommend.mp3',
        'I would like to order.': './assets/audio/tagalog/i_would_like_to_order.mp3',
        'How much is this?': './assets/audio/tagalog/how_much_is_this.mp3',
        'Can I get a discount?': './assets/audio/tagalog/can_i_get_a_discount.mp3'
    },
    'Ilocano': {
        'Hello': './assets/audio/ilocano/hello.mp3',
        'Good morning': './assets/audio/ilocano/good_morning.mp3',
        'Good afternoon': './assets/audio/ilocano/good_afternoon.mp3',
        'Good evening': './assets/audio/ilocano/good_evening.mp3',
        'Thank you': './assets/audio/ilocano/thank_you.mp3',
        'My name is ___.': './assets/audio/ilocano/my_name_is.mp3',
        'Can you help me?': './assets/audio/ilocano/can_you_help_me.mp3',
        'Where is the bus stop?': './assets/audio/ilocano/where_is_the_bus_stop.mp3',
        'How do I get there?': './assets/audio/ilocano/how_do_i_get_there.mp3',
        'How much is the fare?': './assets/audio/ilocano/how_much_is_the_fare.mp3',
        'Can you take me here?': './assets/audio/ilocano/can_you_take_me_here.mp3',
        'What do you recommend?': './assets/audio/ilocano/what_do_you_recommend.mp3',
        'I would like to order.': './assets/audio/ilocano/i_would_like_to_order.mp3',
        'How much is this?': './assets/audio/ilocano/how_much_is_this.mp3',
        'Can I get a discount?': './assets/audio/ilocano/can_i_get_a_discount.mp3'
    },
    'Waray': {
        'Hello': './assets/audio/waray/hello.mp3',
        'Good morning': './assets/audio/waray/good_morning.mp3',
        'Good afternoon': './assets/audio/waray/good_afternoon.mp3',
        'Good evening': './assets/audio/waray/good_evening.mp3',
        'Thank you': './assets/audio/waray/thank_you.mp3',
        'My name is ___.': './assets/audio/waray/my_name_is.mp3',
        'Can you help me?': './assets/audio/waray/can_you_help_me.mp3',
        'Where is the bus stop?': './assets/audio/waray/where_is_the_bus_stop.mp3',
        'How do I get there?': './assets/audio/waray/how_do_i_get_there.mp3',
        'How much is the fare?': './assets/audio/waray/how_much_is_the_fare.mp3',
        'Can you take me here?': './assets/audio/waray/can_you_take_me_here.mp3',
        'What do you recommend?': './assets/audio/waray/what_do_you_recommend.mp3',
        'I would like to order.': './assets/audio/waray/i_would_like_to_order.mp3',
        'How much is this?': './assets/audio/waray/how_much_is_this.mp3',
        'Can I get a discount?': './assets/audio/waray/can_i_get_a_discount.mp3'
    },
    'Kapampangan': {
        'Hello': './assets/audio/kapampangan/hello.mp3',
        'Good morning': './assets/audio/kapampangan/good_morning.mp3',
        'Good afternoon': './assets/audio/kapampangan/good_afternoon.mp3',
        'Good evening': './assets/audio/kapampangan/good_evening.mp3',
        'Thank you': './assets/audio/kapampangan/thank_you.mp3',
        'My name is ___.': './assets/audio/kapampangan/my_name_is.mp3',
        'Can you help me?': './assets/audio/kapampangan/can_you_help_me.mp3',
        'Where is the bus stop?': './assets/audio/kapampangan/where_is_the_bus_stop.mp3',
        'How do I get there?': './assets/audio/kapampangan/how_do_i_get_there.mp3',
        'How much is the fare?': './assets/audio/kapampangan/how_much_is_the_fare.mp3',
        'Can you take me here?': './assets/audio/kapampangan/can_you_take_me_here.mp3',
        'What do you recommend?': './assets/audio/kapampangan/what_do_you_recommend.mp3',
        'I would like to order.': './assets/audio/kapampangan/i_would_like_to_order.mp3',
        'How much is this?': './assets/audio/kapampangan/how_much_is_this.mp3',
        'Can I get a discount?': './assets/audio/kapampangan/can_i_get_a_discount.mp3'
    },
    'Hiligaynon': {
        'Hello': './assets/audio/hiligaynon/hello.mp3',
        'Good morning': './assets/audio/hiligaynon/good_morning.mp3',
        'Good afternoon': './assets/audio/hiligaynon/good_afternoon.mp3',
        'Good evening': './assets/audio/hiligaynon/good_evening.mp3',
        'Thank you': './assets/audio/hiligaynon/thank_you.mp3',
        'My name is ___.': './assets/audio/hiligaynon/my_name_is.mp3',
        'Can you help me?': './assets/audio/hiligaynon/can_you_help_me.mp3',
        'Where is the bus stop?': './assets/audio/hiligaynon/where_is_the_bus_stop.mp3',
        'How do I get there?': './assets/audio/hiligaynon/how_do_i_get_there.mp3',
        'How much is the fare?': './assets/audio/hiligaynon/how_much_is_the_fare.mp3',
        'Can you take me here?': './assets/audio/hiligaynon/can_you_take_me_here.mp3',
        'What do you recommend?': './assets/audio/hiligaynon/what_do_you_recommend.mp3',
        'I would like to order.': './assets/audio/hiligaynon/i_would_like_to_order.mp3',
        'How much is this?': './assets/audio/hiligaynon/how_much_is_this.mp3',
        'Can I get a discount?': './assets/audio/hiligaynon/can_i_get_a_discount.mp3'
    }
};

// ── RANDOM IDLE TRANSLATIONS (shown when input is empty) ─
const idlePairs = [
    { src: 'Tagalog', phrase: 'Magandang umaga', tgt: 'Cebuano', result: 'Maayong buntag' },
    { src: 'Cebuano', phrase: 'Salamat kaayo', tgt: 'Tagalog', result: 'Maraming salamat' },
    { src: 'Tagalog', phrase: 'Kumusta ka?', tgt: 'Ilocano', result: 'Kumusta kan?' },
    { src: 'English', phrase: 'Good evening', tgt: 'Waray', result: 'Maupay nga gab-i' },
    { src: 'Tagalog', phrase: 'Magkano ito?', tgt: 'Cebuano', result: 'Pila man kini?' },
    { src: 'Ilocano', phrase: 'Agyamanak', tgt: 'English', result: 'Thank you' },
];

// ── TRANSLATE FUNCTION ────────────────────────────────────
let currentTranslationKey = '';
function doTranslate() {
    const inputEl = document.getElementById('translate-input');
    const srcLang = document.getElementById('src-lang').value;
    const tgtLang = document.getElementById('tgt-lang').value;
    const input = inputEl.value.trim();
    const outBox = document.getElementById('output-box');
    const outLabel = document.getElementById('output-lang-label');
    const outText = document.getElementById('output-text');
    const audioEl = document.getElementById('translation-audio');

    // Empty input → show random idle translation
    if (!input) {
        const pick = idlePairs[Math.floor(Math.random() * idlePairs.length)];
        document.getElementById('src-lang').value = pick.src;
        document.getElementById('tgt-lang').value = pick.tgt;
        syncDialectOptions();
        outLabel.textContent = pick.tgt + ' translation';
        outText.textContent = pick.result;
        outBox.classList.add('visible');
        inputEl.value = pick.phrase;
        currentTranslationKey = '';
        if (audioEl) audioEl.removeAttribute('src');
        return;
    }

    // Same-language guard
    if (srcLang === tgtLang) {
        showToast('Please select two different languages.');
        return;
    }

    // Lookup exact phrase
    const langMap = translationMap[srcLang]?.[tgtLang];
    const result = langMap?.[input];

    if (result) {
        outLabel.textContent = tgtLang + ' translation';
        outText.textContent = result;
        outBox.classList.add('visible');
    } else {
        outLabel.textContent = tgtLang + ' translation';
        outText.textContent = '— No translation found for this phrase. Try one of the common phrases below.';
        outBox.classList.add('visible');
    }

    // Find the canonical English key for this phrase (audio maps are keyed in English)
    // so audio still resolves whether the person typed the English phrase or
    // a localized one in any supported dialect.
    currentTranslationKey = findEnglishKey(input) || (result ? findEnglishKey(result) : '');

    if (audioEl) {
        if (localizedAudioMap[tgtLang] && localizedAudioMap[tgtLang][currentTranslationKey]) {
            audioEl.src = localizedAudioMap[tgtLang][currentTranslationKey];
        } else if (translationAudioMap[currentTranslationKey]) {
            audioEl.src = translationAudioMap[currentTranslationKey];
        } else {
            audioEl.removeAttribute('src');
        }
    }
}

// Find the canonical English phrase key in PHRASES that matches the given
// text in any dialect (case-insensitive). Returns '' if no match.
function findEnglishKey(text) {
    const lower = text.toLowerCase();
    const entry = PHRASES.find(p =>
        DIALECTS.some(lang => p[lang] && p[lang].toLowerCase() === lower)
    );
    return entry ? entry.English : '';
}

// ── FILL PHRASE & TRANSLATE ───────────────────────────────
function fillPhrase(phrase) {
    document.getElementById('translate-input').value = phrase;
    doTranslate();
}

// ── SYNC DIALECT DROPDOWNS (prevent same-lang selection) ─
function syncDialectOptions() {
    const src = document.getElementById('src-lang');
    const tgt = document.getElementById('tgt-lang');

    const srcVal = src.value;
    const tgtVal = tgt.value;

    // Rebuild tgt options, excluding current src
    Array.from(tgt.options).forEach(opt => {
        opt.disabled = (opt.value === srcVal);
    });
    // If tgt is same as src, switch it to next available
    if (tgtVal === srcVal) {
        const firstAvail = Array.from(tgt.options).find(o => !o.disabled);
        if (firstAvail) tgt.value = firstAvail.value;
    }

    // Rebuild src options, excluding current tgt
    Array.from(src.options).forEach(opt => {
        opt.disabled = (opt.value === tgt.value);
    });
}

// ── SWAP LANGUAGES ────────────────────────────────────────
function swapLanguages() {
    const src = document.getElementById('src-lang');
    const tgt = document.getElementById('tgt-lang');
    const tmp = src.value;
    src.value = tgt.value;
    tgt.value = tmp;
    syncDialectOptions();
    const btn = document.getElementById('swap-btn');
    btn.classList.add('spin');
    setTimeout(() => btn.classList.remove('spin'), 250);
    // If there's already a translation, re-run it
    const input = document.getElementById('translate-input').value.trim();
    if (input) doTranslate();
}

// ── NAVIGATION ────────────────────────────────────────────
let history_stack = ['screen-onboarding'];

function goToScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    history_stack.push(id);
}

function goBack() {
    if (history_stack.length > 1) {
        history_stack.pop();
        const prev = history_stack[history_stack.length - 1];
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(prev).classList.add('active');
    }
}

function setNav(btn, screenId) {
    const nav = btn.closest('.bottom-nav');
    nav.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    btn.classList.add('active');
    goToScreen(screenId);
}

// ── TOAST ─────────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

// ── DIALECT CHIPS (ONBOARDING) ────────────────────────────
document.getElementById('dialect-grid').addEventListener('click', e => {
    const chip = e.target.closest('.dialect-chip');
    if (!chip) return;
    document.querySelectorAll('.dialect-chip').forEach(c => c.classList.remove('selected'));
    chip.classList.add('selected');
    const lang = chip.dataset.lang;
    const src = document.getElementById('src-lang');
    if (src) { src.value = lang; syncDialectOptions(); }
});

// ── ATTACH SYNC TO SELECTS ────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const src = document.getElementById('src-lang');
    const tgt = document.getElementById('tgt-lang');
    if (src) src.addEventListener('change', syncDialectOptions);
    if (tgt) tgt.addEventListener('change', syncDialectOptions);
    syncDialectOptions();
});
// Also run immediately for browsers that execute inline scripts after parse
window.addEventListener('load', syncDialectOptions);

// ── MIC TOGGLE ────────────────────────────────────────────
let recording = false;
function toggleMic() {
    recording = !recording;
    const btn = document.getElementById('mic-btn');
    const status = document.getElementById('mic-status');
    if (recording) {
        btn.classList.add('recording');
        btn.textContent = '⏹';
        status.textContent = 'Recording… tap to stop';
    } else {
        btn.classList.remove('recording');
        btn.textContent = '🎙️';
        status.textContent = 'Tap to speak';
        document.getElementById('translate-input').value = 'Good morning';
        document.getElementById('src-lang').value = 'English';
        syncDialectOptions();
        doTranslate();
    }
}

// ── BOOKMARK ──────────────────────────────────────────────
function toggleBookmark(btn) {
    btn.classList.toggle('saved');
    showToast(btn.classList.contains('saved') ? 'Saved to library ✓' : 'Removed from saved');
}

// ── CATEGORY FILTER ───────────────────────────────────────
function setCat(chip, cat) {
    document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    showToast('Showing: ' + chip.textContent);
}

function filterPhrases(val) {
    document.querySelectorAll('.phrase-row').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(val.toLowerCase()) ? '' : 'none';
    });
}

// ── PRONUNCIATION PRACTICE ────────────────────────────────
const practiceWords = {
    cebuano: { word: 'Maayong Buntag', phonetic: '/ ma·a·yong bun·tag /', meaning: 'Good morning' },
    ilocano: { word: 'Naimbag a bigat', phonetic: '/ na·im·bag a bi·gat /', meaning: 'Good morning' },
    waray: { word: 'Maupay nga aga', phonetic: '/ ma·u·pay nga a·ga /', meaning: 'Good morning' },
    hiligaynon: { word: 'Maayo nga aga', phonetic: '/ ma·a·yo nga a·ga /', meaning: 'Good morning' },
};

function changePracticeWord() {
    const d = document.getElementById('practice-dialect').value;
    const data = practiceWords[d];
    document.getElementById('practice-word').textContent = data.word;
    document.getElementById('practice-phonetic').textContent = data.phonetic;
    document.getElementById('practice-meaning').textContent = data.meaning;
    document.getElementById('score-fill').style.width = (Math.floor(Math.random() * 30) + 60) + '%';
    document.getElementById('score-pct').textContent = document.getElementById('score-fill').style.width;
}

function practiceRecord() {
    showToast('🎙️ Recording… speak now');
    setTimeout(() => {
        const score = Math.floor(Math.random() * 25) + 70;
        document.getElementById('score-fill').style.width = score + '%';
        document.getElementById('score-pct').textContent = score + '%';
        showToast(score >= 85 ? 'Excellent pronunciation! 🎉' : 'Good try! Keep practicing 💪');
    }, 2000);
}

const nextWords = [
    { word: 'Salamat', phonetic: '/ sa·la·mat /', meaning: 'Thank you' },
    { word: 'Mahal kita', phonetic: '/ ma·hal ki·ta /', meaning: 'I love you' },
    { word: 'Oo', phonetic: '/ o·o /', meaning: 'Yes' },
    { word: 'Hindi', phonetic: '/ hin·di /', meaning: 'No' },
    { word: 'Sige', phonetic: '/ si·ge /', meaning: 'Okay' },
];
let nextWordIdx = 0;
function nextWord() {
    const w = nextWords[nextWordIdx % nextWords.length];
    nextWordIdx++;
    document.getElementById('practice-word').textContent = w.word;
    document.getElementById('practice-phonetic').textContent = w.phonetic;
    document.getElementById('practice-meaning').textContent = w.meaning;
    document.getElementById('score-fill').style.width = '0%';
    document.getElementById('score-pct').textContent = '—';
}

function playTranslationAudio() {
    const audioEl = document.getElementById('translation-audio');
    const audioSrc = audioEl && (audioEl.src || translationAudioMap[currentTranslationKey]);
    if (!audioSrc) {
        showToast('No audio available for this phrase');
        return;
    }
    if (!audioEl.src) audioEl.src = audioSrc;
    audioEl.play().then(() => {
        showToast('▶ Playing audio…');
    }).catch(() => {
        showToast('Unable to play audio. Check the file or browser settings.');
    });
}
function showContextMenu() { showToast('💡 Context: Travel / Market / Emergency?'); }

// Keep the complete 393 × 852 prototype canvas inside the portfolio phone frame.
// Scaling the full canvas prevents narrow iframe sizes from reflowing and clipping it.
const prototypeShell = document.querySelector('.shell');
function fitPrototypeToFrame() {
    const scale = Math.min(window.innerWidth / 393, window.innerHeight / 852);
    prototypeShell.style.setProperty('--prototype-scale', String(scale));
}

fitPrototypeToFrame();
window.addEventListener('resize', fitPrototypeToFrame);
