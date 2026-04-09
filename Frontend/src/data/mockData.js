export const mockComparisons = [
  {
    id: 'comp-1',
    problem: '',
    solution_1: `## Sanskrit's Influence on Modern Indian Languages

Sanskrit serves as the etymological and grammatical foundation for the majority of North Indian languages—collectively referred to as the Indo-Aryan language family.

### Vocabulary (Tatsama & Tadbhava)

Modern languages inherit Sanskrit vocabulary through two routes:

- **Tatsama** words: borrowed directly and nearly unchanged (e.g., *karma*, *dharma*, *yoga*)
- **Tadbhava** words: evolved phonetically over centuries (Sanskrit *dugdha* → Hindi *doodh*, milk)

### Grammar & Structure

Hindi, Marathi, Bengali, and Gujarati all retain Sanskrit-derived case endings and verb conjugation systems, though simplified. The concept of *vibhakti* (case markers) directly descends from Sanskrit's eight-case system (*ashtakarana*).

### Script

Devanagari—used for Hindi, Marathi, Nepali, and Sanskrit itself—was directly codified from the Brahmi script tradition, with phoneme-to-grapheme correspondence designed around Sanskrit phonology.

### Cultural & Academic Registers

Higher registers of Hindi (*Shuddh Hindi*), formal Bengali, and classical Marathi draw heavily from Sanskrit, especially in literature, government, and religious contexts.

**Conclusion**: Sanskrit is not merely historical—it is the active structural backbone of grammar, lexicon, and script for over 600 million speakers across South Asia.`,

    solution_2: `## Sanskrit and Modern Indian Languages

The relationship between Sanskrit and modern Indian languages is substantial, particularly for the Indo-Aryan branch (Hindi, Bengali, Marathi, Gujarati, Punjabi, etc.).

**Direct borrowings** are common in formal registers. Words like *vidyalaya* (school), *pustaka* (book), and *jala* (water) appear across multiple languages with minimal phonetic drift.

**Indirect influence** occurs through Prakrits and Apabhraṃśa—the intermediate stages between Classical Sanskrit and today's vernaculars. This chain: Sanskrit → Pali/Prakrits → Apabhraṃśa → Modern languages explains why common everyday words look different from their Sanskrit roots.

**Dravidian languages** (Tamil, Telugu, Kannada, Malayalam) were influenced differently—mainly through loanwords in religion, philosophy, and administration, not structural grammar. Tamil, notably, has a pre-Vedic literary tradition that predates Sanskrit contact.

**Modern impact**: Sanskrit roots continue to generate new technical vocabulary. Many Hindi and Marathi terms for computers (e.g., *sanganak* for computer) are Sanskrit-derived neologisms.

The influence is profound but not uniform—it is deepest in Indo-Aryan languages and more superficial in Dravidian ones.`,

    judge_recommendation: {
      solution_1_score: 8.6,
      solution_2_score: 7.4,
      solution_1_reasoning:
        'Well-structured with clear subheadings. Introduces the tatsama/tadbhava distinction accurately, covers script lineage, and provides concrete examples. Slightly over-claims Sanskrit as "backbone" for all speakers including Dravidian.',
      solution_2_reasoning:
        'Correctly distinguishes Indo-Aryan vs. Dravidian influence—a critical nuance the first response missed. However, the formatting is less structured and some claims (e.g., Prakrits chain) lack concrete examples.',
    },
  },

  {
    id: 'comp-2',
    problem: '',
    solution_1: `## Translating "The river flows calmly" into South Asian Languages

Here are accurate translations across three major Indic languages:

### Tamil (தமிழ்)
**ஆறு அமைதியாக ஓடுகிறது**
*Āṟu amaithiyāka ōṭukiṟatu*

### Telugu (తెలుగు)
**నది శాంతంగా ప్రవహిస్తుంది**
*Nadi śāntangā pravahisṭundi*

### Bengali (বাংলা)
**নদী শান্তভাবে প্রবাহিত হয়**
*Nodi shantobhabe probahito hoy*

### Notes on Translation Choices
- **Tamil** uses *amaithiyāka* (adverb from *amaidi*, peace/calm) — culturally resonates with classical Sangam poetry descriptions of rivers.
- **Telugu** uses *śāntangā* (from Sanskrit *śānti*) — the Sanskritic loanword is natural in formal Telugu.
- **Bengali** *shantobhabe* follows the typical adverb formation pattern (-bhabe suffix indicating manner).

All three capture the static, contemplative quality of "calmly" rather than rendering it as "slowly," which would be a common mistranslation.`,

    solution_2: `## River Flows Calmly — Three Indic Translations

**Tamil:**
ஆறு அமைதியாக ஒழுகுகிறது
(Aaru amaidiyaaga ozhugugiradu)

**Telugu:**
నది ప్రశాంతంగా ప్రవహిస్తోంది
(Nadi prashaanthangaa pravahitondi)

**Bengali:**
নদী শান্তিপূর্ণভাবে প্রবাহিত হচ্ছে
(Nodi shantipurnobhabe probahito hochhe)

These are fairly standard translations using the most natural phrasing in each language. Tamil uses *ozhugugiradu* for flowing (more naturalistic than *ōṭukiṟatu*), Telugu uses *prashaanthangaa* (completely calm, perhaps slightly stronger than needed), and Bengali uses the progressive *hochhe* form which implies ongoing action.`,

    judge_recommendation: {
      solution_1_score: 8.9,
      solution_2_score: 7.8,
      solution_1_reasoning:
        'Provides romanization, cultural context for word choice, and explains the adverb formation system. Correctly distinguishes "calmly" from "slowly." Minor: Tamil verb choice (ōṭukiṟatu = runs) is debatable for a river.',
      solution_2_reasoning:
        'Good alternative vocabulary choices—*ozhugugiradu* and *prashaanthangaa* are arguably more natural. Bengali progressive form is linguistically interesting. Lacks romanization consistency and cultural/grammatical commentary.',
    },
  },

  {
    id: 'comp-3',
    problem: '',
    solution_1: `## Devanagari vs. Tamil Script — Key Differences

These two scripts represent fundamentally different design philosophies.

### 1. Script Type

| Property | Devanagari | Tamil |
|---|---|---|
| Type | Abugida (alphasyllabary) | Abugida |
| Direction | Left to right | Left to right |
| Origin | Brahmi | Brahmi (via Grantha) |

Both are Brahmi-derived, but they diverged significantly by the medieval period.

### 2. Consonant-Vowel System

**Devanagari**: Each consonant has an inherent /a/ vowel that is suppressed using the *halant* ( ् ) marker. Vowel diacritics attach above, below, or around consonants (e.g., क ka → कि ki → के ke).

**Tamil**: Uses a more compact system. Each consonant has one base form; the 18 consonants combine with 12 vowels producing a grid of ~216 characters. The vowels substantially change consonant shape.

### 3. Visual Character

- Devanagari has a distinctive **horizontal headline** (mātrā) connecting letters in a word
- Tamil characters are **rounder**, historically carved into palm leaves where straight lines would split the leaf

### 4. Phoneme Inventory

Devanagari encodes a larger phoneme set (~50+) including aspirated and retroflex distinctions. Tamil script maps to a smaller phoneme set (~30), with a single character sometimes representing multiple sounds (e.g., க் can be k, g, or h depending on position).`,

    solution_2: `## Devanagari vs Tamil Script

Both scripts are abugidas derived from ancient Brahmi, but they look and function quite differently.

**Visual Style**: Devanagari is angular with horizontal bars at the top of each character called *shirorekha*. Tamil is notably rounded—historically because it was written on palm leaves, where angles could tear the material.

**Phonemic Coverage**: Devanagari encodes more sounds, including aspirated consonants (ख, घ, छ) and the full retroflex series. Tamil has a more economical system—one consonant character can represent multiple phonemes, with context determining the exact sound.

**Vowel Integration**: In both scripts, vowels attach to consonants as diacritics, but the mechanism differs. Tamil vowels can substantially alter the visual shape of the consonant. Devanagari vowels attach more predictably.

**Script Exclusivity**: Devanagari is shared across Hindi, Marathi, Nepali, Sanskrit, Maithili, and more. Tamil script is used almost exclusively for Tamil (with minor use in Saurashtra and historical inscriptions).

In summary: same ancient lineage, very different visual appearance, phonological philosophy, and geographic reach.`,

    judge_recommendation: {
      solution_1_score: 9.1,
      solution_2_score: 7.9,
      solution_1_reasoning:
        'Exceptional use of a comparison table, accurate phoneme inventory numbers, clear explanation of the inherent vowel/halant system, and the palm leaf origin for Tamil roundness. Coverage is comprehensive.',
      solution_2_reasoning:
        'Accurate and readable. The palm leaf explanation is present. Less structured but flows as readable prose. Misses the specific grid system detail (216 character combinations) which is important for Tamil script understanding.',
    },
  },
];
