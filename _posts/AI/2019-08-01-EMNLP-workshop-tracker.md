---
date: 2019-08-01
title:  "EMNLP workshop tracker"
tagline: Important Dates
category: AI
tags:
- EMNLP
layout: post
published: false
---
{% include JB/setup %}




##  EMNLP Workshops Chooser

{% highlight none %}
https://www.emnlp-ijcnlp2019.org/

 
TextGraphs-2019
  https://sites.google.com/view/textgraphs2019
  
  The workshops in the TextGraphs series have published and promoted the synergy between the field of Graph Theory and Natural Language Processing. 
  Besides traditional NLP applications like word sense disambiguation and semantic role labeling, 
  and information extraction graph-based solutions nowadays also target new web-scale applications like information propagation in social networks, 
  rumor proliferation, e-reputation, language dynamics learning, and future events prediction, to name a few.
  
  The (lucky!) thirteen edition of the TextGraphs workshop aims to extend the focus on 
  (1) issues and solutions for large-scale graphs, such as those derived for web-scale knowledge acquisition or social networks and 
  (2) graph-based and graph-supported machine learning and deep learning methods. 
  
  We encourage the description of novel NLP problems or applications that have emerged in recent years, 
  which can be addressed with existing and new graph-based methods. 
  Furthermore, we also encourage research on applications of graph-based methods in the area of 
  Semantic Web in order to link them to related NLP problems and applications.

  SharedTask : Evaluation is over on 9-Aug...
    https://github.com/umanlp/tg2019task
    https://github.com/umanlp/tg2019task/issues/4  (Masked gold answers...)
  
    https://competitions.codalab.org/competitions/20150#learn_the_details
    
    Another one is a tf-idf baseline implemented in Scala that uses SVMrank, 
    which demonstrates the MAP of 0.28 on the same dataset. 
    I think it is fine to improve even slightly over the Scala baseline.
    
    ...
    
    Basic understanding of .py and .scala baselines
      Notice problem with evaluate.py
    Preproc now done (not much in-depth string matching at this stage)
    
    Try basic graph messaging ideas
    Have uploaded a 'practice submission' : 
      (uses slimmed down graphs with explanation inverse term priority)
      clearly the uploader is finicky (or Practice scores === 0.0)
    Ken has proven that TFIDF can be surprisingly effective 
      Use this as an initialisation 
    
    - Competition ends (we're on leaderboard)
    
    Do better preproc on TSV : 
      Create list of 'must be nodeable' texts == 'musthave'
      Split apart alternatives = cells containing ';'  
        (with combinations)  
        Add 'orig' form of text too (for debug) with extra '{}'
      Uniquify 'uid' by adding _+combo-number on end
        And dedupe when outputting results
      Annotate 'table-purpose' column somehow == 'table'
      Create list of musthave lemmas to ensure all node options have a node
      Respect the '[SKIP] DEP' column having a string in it
        Actually, this hasn't been handled reliably in the dataset itself
      Verbose output of single prediction (including gold data)
        Include reason field
        Include gold'*' status of predictions
      Standalone function to calculate MAP of a predicted explanation set 
      Look at the given files for better lemmatization hints:
        -  ./annotation/lemmatization-en.txt      
        -  ./annotation/expl-tablestore-export-2017-08-25-230344/tables/LemmatizerAdditions.tsv
        +  it seems that if a word on the RHS appears, then it should be translated into the LHS version
      Seems like NLTK stop-words more effective than spaCy ones (!)
      Copy preproc into public repo : world_corpus.preprocess.XYZ()
        +  update notebooks to use it
      Create private repo for code
      Decide on combos vs ignore combos for paper
        -  Ignore combos for now (over-complicates discussion - high branching factor)
      Iterated TFIDF is another strong (and simple) baseline
      We know that spaCy lemmatisation beats WordNet (in NLTK)
        +  Is the worldtree_corpus provided lemmatisation competitive? = YES
      Timings for 3 methods
      Graphs of MAP vs Explanation length
      Run test on MAP ordering metrics to understand number of rankings that are meaningful to MAP scoring (+/- 0.0001, say)
      Are all explanations used at least once in the training set?
        - Nope  (only 3200 of 5000)
      Copy competition entry code into public repo (actually, a 'textgraphs' branch of the repo)
        +  Add 'supplemental_materials.txt' with a link to the public repo
      ^ DONE ^
      v TODO v
      Are all explanations used at least once in the training + dev set?
      For the training set, to what extend does our lemmetization, etc produce a 'viable' winning entry?
        +  i.e.  Would the Gold explanation set give us an objectively good score on our 'real-time' metrics?
        +  Need to define some evaluation metrics with which we can hill-climb
           -  and check whether they actually 'love' the correct explanations from the training set
      For the combos case, use some evaluation metrics to figure out which combo is actually intended
        +  First, let's figure out what is the approximate mean 'combo factor' of each set of combos
        +  Have to decide whether to enumerate or hill-climb
           -  Once decided, need to store correct answer in a 'combos-unravelled' format for reloading
      Output 'triple with extras' as separate field?
      Create GitHub PR to fix evaluate.py

    
    Plan for paper :  (23-08-2019: System description paper deadline)
      "Language Model Assisted Explanation Generation \\ TextGraphs 2019 Shared Task System Description"
      https://github.com/umanlp/tg2019task/issues
      https://competitions.codalab.org/competitions/20150#results
      Basics:
        Fix evaluate.py to enable shorter inputs without error
        Lemmatization using their files
        NTLK stop-words
        PTB Tokenisation
      Talk about 3 methods :
        Base (optimised) TFIDF
        Iterated TFIDF
        BERT reranking of explanations of solutions
      Discussion points :
        Graph is not of standard triples
        Combos (Not used above)
        Difficulty of 'something' sentences
      SUBMITTED!
        All submission deadlines are at 11:59 p.m. PST
        Paper submission: August 23, 2019
        Notification of acceptance: September 16, 2019
        Camera-ready submission: September 30, 2019
        Workshop date: November 3 or 4, 2019

  TextGraphs-13 solicits both long and short paper submissions:
    a short paper has up to 4 pages of content plus unlimited references;
    a long paper has up to 8 pages of content plus unlimited references.


FEVER 2.0 Workshop
  http://fever.ai/workshop.html
  
  Shared task is over (4 real contestants)
  
  We invite long and short papers on all topics related to fact extraction and verification, including:
    Information Extraction
    Semantic Parsing
    Knowledge Base Population
    Natural Language Inference
    Textual Entailment Recognition
    Argumentation Mining
    Machine Reading and Comprehension
    Claim Validation/Fact checking
    Question Answering
    Theorem Proving
    Stance detection
    Adversarial learning
    Computational journalism
    System demonstrations on the FEVER 2.0 Shared Task

  Important dates
    First call for papers: 10 May 2019
    Second call for papers: 14 June 2019
    Submission deadline: 19 August 2019
    Notification: 16 September 2019
    Camera-ready deadline: 30 September 2019
    Workshop: 3/4 November (EMNLP-IJCNLP)
  All deadlines are calculated at 11:59pm Pacific Daylight Savings Time (UTC -7h).

  ---
  
  Factoids from GPT2-117?


MRQA: Machine Reading for Question Answering
  https://mrqa.github.io/
  Task is essentially over
  
  We seek submissions on the following topics:
    Accuracy: How can we make MRQA systems more accurate?
    Interpretability: How can systems provide rationales for their predictions? To what extent can cues such as attention over the document be helpful, compared to direct explanations? Can models generate derivations that justify their predictions?
    Speed and Scalability: Can models scale to consider multiple, lengthy documents, or the entire web as information source? Similarly, can they scale to consider richer answer spaces, such as sets of spans or entities instead of a single answer one?
    Robustness: How can systems generalize to other datasets and settings beyond the training distribution? Can we guarantee good performance on certain types of questions or documents?
    Dataset Creation: What are effective methods for building new MRQA datasets?
    Dataset Analysis: What challenges do current MRQA datasets pose?
    Error Analysis: What types of questions or documents are particularly challenging for existing systems?

  All submission deadlines are 11:59 PM GMT -12 (anywhere in the world).
  August 19, 2019: Deadline for submission
  September 16, 2019: Notification of acceptance
  September 30, 2019: Deadline for camera-ready version


Neural Generation and Translation (WNGT 2019)
  https://sites.google.com/view/wngt19/home
  
  Neural sequence to sequence models are now a workhorse behind a wide variety of different natural language processing tasks 
  such as machine translation, generation, summarization and simplification. 
  This workshop aims to provide a forum for research in applications of neural models to language generation and translation tasks 
  (including machine translation, summarization, NLG from structured data, dialog response generation, among others).

  Efficiency shared task:   (NMT)
    https://sites.google.com/view/wngt19/efficiency-task
    Last year the task attracted 4 teams and we expect the number to be equal to or greater than this next year. 
    
  Document level generation and translation task: 
    https://sites.google.com/view/wngt19/dgt-task

  The workshop is broad in scope and invites original research contributions on all topics where neural networks 
  are involved in the field of machine translation. The topics of interest include, but are not limited to the following:

    Neural models for machine translation, generation, summarization, simplification
    Analysis of the problems and opportunities of neural models for all of these tasks
    Methods for incorporating linguistic insights: syntax, alignment, reordering, etc.
    Handling resource-limited domains
    Utilizing more data: monolingual, multilingual resources
    Multi-task learning
    Neural translation and generation models for mobile devices
    Visualization of sequence-to-sequence models
    Beyond sentence-level processing
    Beyond maximum-likelihood estimation

  First call for papers: April 8, 2019
  Second call for papers: Jun 14, 2019
  Submission deadline: August 19, 2019
  Notification of acceptance: September 16, 2019 (+4w after submission)
  Camera-ready papers due: September 30, 2019 (+2w after notification)
  
  Extended Abstracts
  Preliminary ideas or results may also be submitted as extended abstracts, with a length of 2 to 4 pages plus references. 
  Similarly to full papers, these abstracts will follow the ACL formatting requirements, be submitted through Softconf, 
  and be reviewed by the program committee. 
  Accepted abstracts will be presented as posters, but not be included in the workshop proceedings. 
  Abstracts in this track should be anonymized, and should put "This is a submission to the extended abstract track." 
  at the end of the abstract submitted to Softconf (it does not need to be noted in the paper itself).

  ---
  
  Sam's BERT re-writer :
    Data augmentation for NLP?


NewSum
  https://summarization2019.github.io/
  
  The Workshop on New Frontiers in Summarization seeks to bring together 
  researchers from a diverse range of fields 
  (e.g., summarization, visualization, language generation, cognitive and psycholinguistics) 
  for discussion on key issues related to automatic summarization.

  Topics
    Abstractive and extractive summarization
    Language generation
    Multiple text genres (News, tweets, product reviews, meeting conversations, forums, lectures, student feedback, emails, medical records, books, research articles, etc)
    Multimodal Input: Information integration and aggregation across multiple modalities (text, speech, image, video)
    Multimodal Output: Summarization and visualization + interactive exploration
    Tailoring summaries to user queries or interests
    Semantic aspects of summarization (e.g. semantic representation, inference, validity)
    Development of new algorithms
    Development of new datasets and annotations
    Development of new evaluation metrics
    Cognitive or psycholinguistic aspects of summarization and visualization (e.g. perceived readability, usability, etc)
  
  Paper Submission Deadline: August 19, 2019
  Workshop Date: November 4, 2019
 

---

COIN
  https://coinnlp.github.io/
  
  COmmonsense INference in NLP is a workshop that aims at bringing together 
  researchers that are interested in modeling commonsense knowledge, 
  developing computational models thereof, 
  and applying commonsense inference methods in NLP tasks.
 
  We extended the evaluation phase for the shared tasks until 19 July! == OVER NOW
  
  August 19, 2019: Due date for workshop and shared task papers
  All deadlines refer to 11:59pm Pacific Daylight Savings Time (UTC/GMT -7 hours).

  Each submission must be anonymized, written in English, and contain a title and abstract. We especially welcome the following types of papers:
    Technical papers that demonstrate the impact of commonsense knowledge inference in tasks and applications
    Position papers that reflect innovative, creative and thought-provoking ideas
    Theoretical papers that advance our understanding of commonsense inference
    Papers that describe data collection efforts for evaluating commonsense inference
    Survey papers that review the current state of research in a specific area
    Papers describing submissions to the shared tasks described below


CoNLL
  http://www.conll.org/
  Paper submission: May 31, 2019 == TOO LATE


WAT2019
  http://lotus.kuee.kyoto-u.ac.jp/WAT/WAT2019/index.html
  Asian Translation
  
  Research Paper Submission Deadline	August 19, 2019	

  In addition to the shared tasks, the workshop will also feature scientific papers 
  on topics related to the machine translation, especially for Asian languages. 
  Topics of interest include, but are not limited to: 
    analysis of the automatic/human evaluation results in the past WAT workshops
    word-/phrase-/syntax-/semantics-/rule-based, neural and hybrid machine translation
    Asian language processing
    incorporating linguistic information into machine translation
    decoding algorithms
    system combination
    error analysis
    manual and automatic machine translation evaluation
    machine translation applications
    quality estimation
    domain adaptation
    machine translation for low resource languages
    language resources  

...


arxiv hunt
  Find endorser status of relevant workshop committee members
  Prepare a workshop paper for arxiv upload
    -  Almost did this for 1 'recently' (find out which one)
       -   Actually, it was 2018-11-25 for CDNNRIA - but never heard back
  Send out initial email to CLVR 2017 ViGIL committee member 
  ^ DONE ^
  v TODO v
  Check RDAI email domain has correct DNS-TXT entries (or whatever)
  Send out more initial emails 
    - ViGIL committee looks like it's well aligned
  

{% endhighlight %}


