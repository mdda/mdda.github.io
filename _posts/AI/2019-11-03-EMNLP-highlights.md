---
date: 2019-08-01
title:  "EMNLP highlights"
tagline: Conference Takeaways
category: AI
tags:
- EMNLP
layout: post
published: false
---
{% include JB/setup %}

##  EMNLP Highlights

{% highlight none %}
https://www.emnlp-ijcnlp2019.org/

FEVER
  "Investigating robustness and interpretablity of link prediction via adversarial modifications"
    https://pouyapez.github.io/criage/ - NACCL 2019
    -  Adding/deleting facts 'smoothed' discrete 
    -  Also effect was approximated via taylor series expansion
    -  Worked 'pretty often' (but rejected obviously suggestive phrasing)
  Fake answers and text using Triggers
    "zoning tapping fiennes" -> negative sentiment
    "why how because "+reason
    "TH PEOPLEMan goddreams Blacks" => All GPT models become racist (even with additional context)
  Has a KB-enhanced fact finder based on GPT2
  FakeNewsChallenge
    Macro-F1 rewards in-balanced classes more appropriately than standard F1
  Hierarchical Stance detection
    "From Stances' Imbalance to Their Hierarchical Representation ..."
      = https://www.researchgate.net/publication/331304021_From_Stances'_Imbalance_to_Their_Hierarchical_Representation_and_Detection
    Relevant vs Irrelevant = Top level
      Supports, Contradicts and Discusses = lower level
    Overall loss is a combination of :
      Minimize classification loss
      Maximum Mean Discrepancy (MMD) regularization as an additional loss
    Very nice diagram of effect of adding MMD regularization on page 8 of PDF above
    
  -Lunch-
  
  Invited Talk: Fact Verification with Semi-Structured Knowledge = Semi-structured facts support
    + Introduced table-based-fact dataset
      =  https://github.com/wenhuchen/Table-Fact-Checking
    "TabFact: A Large-scale Dataset for Table-based Fact Verification" 
      = https://arxiv.org/abs/1909.02164
    - LPA : Create DB scheme sequence to generate results
      +  Rank program's relationship to query
      +  Use result
      +  Should be more interpretable, but actual programs not checked for plausibility
    - BERT-table : Convert table to text using templates
      +  Need to look at paper for details (see page 7 of PDF for results)
      +  Works on-a-par with LPA method above

  Fact Extraction and Verification for Precision Medicine
    Hoifung Poon = Microsoft
    *Want slides* 
    *Want business use-case*  (see below to acquisition...)
  Project Hanover
    Probabalistic Logic
      Markov logic --> Horrible blowup due to huge state-space
      Factor - Variable - Probability
    Deep Learning 
      Variational EM : Marginal ~P(z1,z2,z3) -> Probablistic Labels
      Efficient Approximate Inference
      Virtual evidence -> variables
    Multiscale Representations Learning
      Input Text
        Mention-lelvel representations
          Entity-level representations
            Final Prediction
    Graph LSTM
      Exploit rich linguistic structures
      Distant suppervision : GDKD+CIVIC
      Cross-sentence triples extraction yiled
      Distant Supervision + Data Programming + Joint Interence
        Precision : +10% ...
      Jia et al "Document-Level n-ary relation extraction with multisclae representation leaarning" NAACL-19
        https://arxiv.org/abs/1904.02347
    JAX lab (Hanover Collaboration)
      Curation KB
      Drug/Gene/Mutation + Cancer type  (80/20 choices for curation)
      Trust-worthiness : Not explored
      Different institutions => Different acronyms/terms
    EMR: 60-80% in unstructured text
      Only 3% of cancer patients enroll in clinical trials  
    Scenario : Drug Development
      $2.5bn-10bn per drug with ~50 FDA approved per year
      Phase-3 trial : New Drug (thousands of patients) 
        vs Existing standard-of-care (already exist, though)
        ...  Potential to cut cost of new drug in half
      =  Synthetic control
        Flatiron (acquired by Roche?)
    PDF cleansing
      Engineering problem for text
      Other modalities (graphs, tables, etc)
        Tables are "joyful" source of recall
        Problems due to these isses affect recall ~10%

  FEVER3 -> F3VER in 2020
    No new shared task 
      1+2 will continue


Tutorial : Discreteness in Neural Natural Language Processing. 
  Presenters : Lili Mou, Hao Zhou and Lei Li. 
  9:00-12:30 :: AWE Hall 2B - Part. 2


Tutorial : Graph-based Deep Learning in Natural Language Processing. 
  Presenters : Shikhar Vashishth, Naganand Yadati and Partha Talukdar.
  14:00-17:30 :: AWE Hall 2B – Part. 2

      
WNGT 2019
  https://sites.google.com/view/wngt19/schedule
  Posters = 10:40-11:40
  

TextGraphs 2019 (13th edition = oldest workshop series at EMNLP)
  https://sites.google.com/view/textgraphs2019/program
  Acceptance rate:
    31 papers (17 long, 14 short)
    18 accepted (9 long, 9 short)
  Timetable
    Session 1 : 9:00-10:25
    Session 2 : 11:00-12:10
    Session 3 : 14:00-15:30 (Peter Jansen, Shared Task)
    Posters   = 16:00–17:20
  
  "Transfer in Deep Reinforcement Learning using Knowledge Graphs" - Prithviraj Ammanabrolu (Raj, Georgia Tech)
    RL for agents acquiring language
      Training with humans is costly
    Text Adventure games ~ Zork
      Partial observability
      Commonsense reasoning = FOCUS
      Combinatorial state-action space
    OpenIE to extract relations (can be a bit crazy)
    Commonsense and Thematic Reasoning
      Affordances : "open mailbox" vs " eat mailbox"
      Genre tropes : Garlic can be used to kill vampires
      
    "Playing Text Adventure Games with GRaph-Based Deep RL"  
      KG-DQN Architecture
        State Network : Graph embeddings and an SB-LSTM to model state
        Action Network : LSTM based encoder for each action
        Action pruning : Reject actions that are clearly low value
    Game Playing as Question-Answering
      What action is best to take next given current state?
      Training based on Oracle playing the game through
    Much better to train on another game, then fine-tuning on target
      Rather than learning from scratch on target alone
    
  "Relation Prediction for Unseen-Entities Using Entity-Word Graphs" - Yuki Tagawa (REMOTE)
    Knowledge Graph Prediction
    Out-Of-KG (OOKG) Problem
      Previous work : DKRL (Xie et a 2016)
        Uses description fields of entities to create embeddings of each
      Current work
        Connects description to lots of words also in a graph
        TF-IDF adjacency matrix
        PMI adjacency matrix
        Encoder-Decoder model

  "Scalable graph-based method for individual named entity identification" - Sammy Khalife
    New method for entity identification for text date
    Named Entity Discovery (NED) is a step on from NER (include images, etc)
    Named Entity Identification is a classification problem?  YES, but...
    NAmed Entity Linking (NEL)
    Related work
      Collective Linking (not done here)
      Probabalistic Graphical Models - too many states (quadratic linkage)
      Embeddings, Neural Architectures
    Graph-based named entity identification
      Entity filtering 
        Lexical (But this is not enough)
          Acronym expansion
          Context-awareness
          Has a 99.5% recall @20         
        Ontology " tree of entity types
          Originally just PER, ORG, LOC
          Now 250 ontologies available now
      Mention to entity/name (same performance)
        Jaccard scores of N-grams 
        Levensthein distance
      Have limited number of candidates
      Choice of scoring function
        Graph of words : Rousseau and Vazigaris? 2013
        Measure of similariteis - Cordella et al 2004
          Includes TF-IDF
      Train regressor to classify good entities from bad one
    Results
      Other method (DL) : Rahmann and Rahmann 2018
      Their results show that size of the ontology is important (~20 is a turning point)
      
  "Neural Speech Translation using Lattice Transformations and Graph Networks" - Daniel Beck (Melboune)
    Speech utterance -> Text in a different language
    Other work
      End2End : less error-prone but also less flexible
      Pipeling = ASR+MT : Easier to incorporate additional information / dictionaries
        Speech lattices + LM 
    Speech translation is a graph-to-sequence model
      Use g2s model of Beck eta al 2018 : Gated Graph NN (Li et a 2015 GGNN) as the encoder
    Line graph transformation
      Edges becomes a node (and vice versa)
      Add subword information (eg: BPE)  
      Minimisation (to combine duplicate branches)  Standard automata : Hopcroft 2007
      GGNN encoder takes lattice with shared parameters across layers (~8 used here)
    Decent results : Improvements as complexity added
      Lattice weights seemed to hurt rather than help...

  - Coffee - 

  "Using Graphs for Word Embedding with Enhanced Semantic Relations" - Matan Zuckerman      
    Missed due to posters (including WGNT) over coffee
    
  "Identifying Supporting Facts for Multi-hop Question Answering with Document Graph Networks" - Marco Valentino
    Supporting fact identification
    Text/GloVe search for 30 most likely sentences (recall = 0.94) maximises F1
    Graph NNs with 3 hops to classify which sentences are supporting (linear classifier)
    Seems to work fairly well  
  
  "Essentia: Mining Domain-specific Paraphrases with Word-Alignment Graphs" - Danni Ma (short paper)
    Paraphrase extraction current methods:
      Require large annotated data
      Extract general-purpose paraphrases
      Paraphrase Databases : PPDB
    Domain-specific paraphrases with limited labelled data = their system
      The world economy has fullt recovered from the crisis
      The global economy has shrugged off the crisis completely
      The global economy has gotten rid of the crisis already
    Construct a lattice, grouping similar meanings
      Using word aligner...  (Sultan et al 2014)
      The {world,global} economy has {fully recovered from, shruggeed off, gotten rid of} the crisis {already, completely}.
      Now can generate paraphrases automatically
        Graph structures imply semantic relationships
    Datasets (small)
      Hotel QA
      Snips Couce et al 2018
    Baseline method (Pang et al 2017?)
      Finite state automata (= very similar to this method, frankly)
    Results
      460% increase for Snips  :-)
    Problems
      Need to reduce false positives
      Not robust to typos
    Demo
      https://github.com/chenrit/Essentia

      
  "Layerwise Relevance Visualization in Convolutional Text Graph Classifiers" - Robert Schwarzenberg (short paper)
    Visualise / Interpret Graph-Convolutional Networks
    Layerwise Relevance Propagation (better : Backpropagation)
    This works Ok for Feedforward networks
      but graph networks' adjacency matrix might 'drain relevance'
      Paper's technique fixes up this problem
    Output seems to make sense   
    
  - Lunch -
  
  OLD : "Controllable Language Generation" - Minlie Huang (Tsinghau University)
  NEW : "Knowledge-Enhanced Language Generation" - Minlie Huang (Tsinghau University)
    NLP = NLU + NLG
    Types:
      Text-to-text
        Summarization, Simplification, Paraphreasing
        Translation, Dialog, Long text generation
      Data-to-text
      Meaning-to-text
      Image/video-to-text
    Information perspective
      Perfect Information
        Summarization, Translation
      Imperfect Information
        Less-to-more : data-to-text, zero-to-textx 
          Open-ended NLG 
          More creativity
    Open-ended NLG 
      One-to-many mapping problem
      Observed samples very limited in training data
    HERE : Dialog generation and/or story/essay generation
    Issues in NLG
      Repetition, Fluency
      Specificity, Informativeness, Diversity  (++ with Knowledge)
      Consistency, Coherence, Conflict
      Fidelity, Relevance
    Knowledge can add implicit planning for (for instance) stories
    Dialog Generation
      Commonsense  knowledge
        If you don't know about something : Machine should ask 
        "Commonsense Knowledge Aware Conversation Genereation with Graph Attention" IJCAI-ECAI 2018
        Attend to graph at each step of dialog sentence construction
    Story Ending Generation
      Multi-source attention : 
        Context from previous sentence / word
        Context from Knowledge Graph
    Commonsense Story Generation
      "A Knowledge-Enhanced Pretraining Model for Commonsense Story Generation" - TACL 2019
      Generate GPT2 pretraining using templates to convert Knowledgebase to sentences
      Story classification task
        True ending
        Random Shuffle of sentences
        Replace sentence
        Repeated sentences
      Works pretty well in including logical progressions, without repetition  
    CoTK Conversational Toolkits
      Conversational toolkit
      http://coai.cs.tsinghua.edu.cn/hml
    Welcome to TaTK
      Task-oriented dialog system
      http://coai.cs.tsinghua.edu.cn/dialtk
  
    
  "TextGraphs 2019 Shared Task on Multi-Hop Inference for Explanation Regeneration" - Peter Jansen 
  
  
  - Coffee and Posters -
  
  
Main Conference Day 1
  Keynote : IBM's Project Debater

  Session 1C: Dialog & Interactive Systems I
    +Guided Dialog Policy Learning: Reward Estimation for Multi-Domain Task-Oriented Dialog. Ryuichi Takanobu, Hanlin Zhu and Minlie Huang    
      Adversarial Inverse RL (AIRL) to learn how to do dialogues
      Can augment system with NLU + NLG modules
      *Good setup*
    -Multi-hop Selector Network for Multi-turn Response Selection in Retrieval-based Chatbots.
      Over-complicated
    *MoEL: Mixture of Empathetic Listeners.
      Style of response
        Happy : Share feeling
        Angry : Calm you down
        Disappointed : Cheer you up
      Structure
        Emotion tracker (Standard transformer encoder)
        A panel of separately trained emotional-response experts
        Meta-listener to meta-supervise the response
          Initial training done using explicit emotion labels
            gradually 
      Benchmark : Empathietic dialogue Benchmark (Rashkin 2019)
        25k emotion pre-classified contexts 
        32 classes of emotional content (~80% recognition accuracy)
    +Entity-Consistent End-to-end Task-Oriented Dialogue System with KB Retriever. 
      Video playback of first author (questions answered on stage)
      When doing KB row attention, fix on what you're talking about, rather than searching repeatedly
      Two methods to cope with training discrete decisions
        Distant supervision based on text-match counts
        Gumbel-Softmax : But this was difficult to train from scratch
          Bootstrap with the distant supervion method
      Datasets
        InCar Dataset Eric et al SIGDIAL 2017
        Camrest ...
      Metrics
        BLEU + "Micro Entity F1"
        Good results
      Single row coverage
        90% of navigation domain
        80% for Camrest578
        75% for weather domain
    .Building Task-Oriented Visual Dialog Systems Through Alternative Optimization Between Dialog Policy and Language Generation.
      Image guessing game : Ask questions in several round to select which image was 
      Dataset : GuessWhich 
        (simliar to Visual Dialog - Das et al 2017)
      Word-Level RL difficult (used by Das et al 2017, though)
        Huge action space (of sentences)
        Difficult to balance 'question strategy' vs 'grammar output' objectives
      Contribution
        Plan for two actions : 
          Output next dialogue step
          Reward based on current classification estimate score
    +Demo : Applying BERT to Document Retrieval with Birch
      Use BM25 scores to aggregate BERT embeddings of sections of documents
      Interesting
    
  - Lunch until 13:30 -
  
    Session 2D : Information Extraction I
      Fine-Grained Evaluation for Entity Linking
        Focusses on evaluation (rather than doing the task of Entity Linking well itself)



{% endhighlight %}


