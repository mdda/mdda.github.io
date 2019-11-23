---
date: 2019-11-03
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

###  Workshops

Red Dragon had papers/posters to present at three of the workshops at EMNLP : 

*  FEVER :        arXiv : http://arxiv.org/abs/1911.08340 == 10.18653/v1/D19-6606
*  WNGT  :        arXiv : http://arxiv.org/abs/1911.09661 == 10.18653/v1/D19-5623
*  TextGraphs  :  arXiv : http://arxiv.org/abs/1911.08976 == 10.18653/v1/D19-5311  ADDING on arxiv


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
  
{% endhighlight %}



### Main conference

{% highlight none %}

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
      -Fine-Grained Evaluation for Entity Linking
        Focusses on evaluation (rather than doing the task of Entity Linking well itself)
        Tiny datasets
      -Supervising Unsupervised Open Information Extraction Models
        Video playback of first author 
        OpenIE : Open relatonship types
      -A Little Annotation does a Lot of Good: A Study in Bootstrapping Low-resource Named Entity Recognizers
        Enabling easier NER labelling for low-resource languages
      +KnowledgeNet: A Benchmark Dataset for Knowledge Base Population
        DiffBot is the company that's doing this
        New dataset with automated evaluation : Should help accelerate research
        Takeaway : Pipeline accumulated losses kill you 
      .Effective Use of Transformer Networks for Entity Tracking
        Different ways to put stuff through BERT
      
    Session 3W : Posters
      +Unsupervised Labeled Parsing with Deep Inside-Outside Recursive Autoencoders.
        DIORE
      +Sampling Matters! An Empirical Study of Negative Sampling Strategies for Learning of Matching Models in Retrieval-based Dialogue Systems. 
        'semi hard' margin maximisation works best
      
    Session 3A : Machine Learning II
      +Commonsense Knowledge Mining from Pretrained Models
        Mask words in BERT and see whether they 'make sense' based on a PMI measure
      .RNN Architecture Learning with Sparse Regularization
        Rational RNNs
          QRNNs, Simple Recurrent units
          Hidden layer within rational RNN has internal structure
            Hidden state update can be written as the forward calculation of a set of Finite State Automata
        Sparsifing regularisation
          Group Lasso : Can eliminate entire blocks in RNN processing

    Session 4W : Posters+Demos
      ?Towards Knowledge-Based Recommender Dialog System. 
        Didn't find
      ?Graph Convolutional Network with Sequential Attention for Goal-Oriented Dialogue Systems
        Didn't find
      .Chameleon: A Language Model Adaptation Toolkit for Automatic Speech Recognition of Conversational Speech. 
        All examples in Chinese
          Need to look at source (being released 'soon')
      .PyOpenDial: A Python-based Domain-Independent Toolkit for Developing Spoken Dialogue Systems with Probabilistic Rules.
        XML-based
      .PolyResponse: A Rank-based Approach to Task-Oriented Dialogue with Application in Restaurant Search and Booking.
        In-production != cool techniques
      +Entity resolution for noisy ASR transcripts (Cisco)
        Audio front end produces (probably) text output
        They convert all to phonemes
        Search in phoneme space (using eg: elastic search) for contacts
        Working for customer installations of up to 100k people's names
      +Knowledge Aware Conversation Generation with Explainable Reasoning over Augmented Graphs
        Baidu
        Looks interesting
      *Gunrock: A Social Bot for Complex and Engaging Long Conversation
        Amazon Alexa prize winner/competitor
      *Compositional Generalization for Primitive Substitutions 
        Baidu
        Compositionality idea that gets better-than-human in zero-shot environment...

Main Conference Day 2
  Keynote : KAIST - Computational Social Science
  
  Session 5 : Poster & Demo: Question Answering, Textual Inference & Other Areas of Semantics 
    +Adaptively Sparse Transformers. 
      EntMax : Alpha parameter lets each head choose how sparse it wants to be
      Includes analysis of which transformer layers choose which values of alpha
    .Show Your Work: Improved Reporting of Experimental Results
      Illustrates problems of using results from previous papers (ignorant of budget/hyperarameters)
    
  - Lunch until 13:30 -
  
  Session 6A : Tagging, Chunking, Syntax & Parsing
    +Designing and Interpreting Probes with Control Tasks. 
      Create probe tasks that are random, to see the gap that has been learned (or not) by model
    *Specializing Word Embeddings (for Parsing) by Information Bottleneck.
      Try to remove 'useless' information in word embeddings
      'Thresher' can be trained very quickly to disentangle useful and useless information
      Actually manages to isolate useful components coming out of ELMo
    .Deep Contextualized Word Embeddings in Transition-Based and Graph-Based Dependency Parsing - A Tale of Two Parsers Revisited.
      History of dependency parsing
      Middle 4 layer outputs of BERT were most useful for dependency parse task
    -Semantic graph parsing with recurrent neural network DAG grammars
    +75 Languages, 1 Model: Parsing Universal Dependencies Universally.   
      Train on all different dependency tree types, on all languages, simultaneously
      Learn a softmax-ed distribution with which to combine layers of BERT
      25 days on a 1080Ti in someone's bedroom
      Nice results accross languages (even low-resource ones)
      
  Session 7B : Reasoning & Question Answering
    .`Going on a vacation` takes longer than `Going for a walk`: A Study of Temporal Commonsense Understanding.    
    +QAInfomax: Learning Robust Question Answering System by Mutual Information Maximization.
      Adversarial-SQuAD shows that models may be overfitting SQuAD datasets
      Apply MutualInformation as a regularizer for NLP representation
        Add : Local Constraint and Global Contraint
      Maximise MI by :
        Sample +ve from P(X,Y) and -ve examples from P(X)P(Y)
        Train a classifier to tell between a true context and a fake one
    .Adapting Meta Knowledge Graph Information for Multi-Hop Reasoning over Few-Shot Relations. 
      Few-shot relations are rare - but, like words, rare relationships are common overall
    +How Reasonable are Common-Sense Reasoning Tasks: A Case-Study on the Winograd Schema Challenge and SWAG. (Microsoft)
      Transformer models lack common sense (defined loosely)
        Background knowledge : World knowledge; points of reference; what is plausible and realistic
      Winograd Schema challenge task all have flipped version
      Other CSR Tasks : SWAG (continuations)
      Limitations :
        Often statments are templates
        Limited size (Winograd is 273 questions only)
      Idea:
        Switching protocol - can switch, for instance, named entities
        For continuatioins, do the task with and without the premise
      Results
        Much less clear that BERT does know much about commonsense reasoning
        
  Session 8C : Information Extraction II
    *Improving Distantly-Supervised Relation Extraction with Joint Label Embedding. 
      Distant supervision assumes that every sentence containing two entities 
        has the relationship of edge in Knowledge Graph
      Learn label embeddings jointly from KGs and entity descriptions
      Model parts
        Entity description embedding
        Label Embedding with Gating mechanism
        Label Embedding-attending relation classifier
      Loss function (evenly weighted, after trying different weights)
        Label classifier
        Relation classifier  
      Experiments
        Their model works well vs 7 baselines on 2 datasets
    +Leverage Lexical Knowledge for Chinese Named Entity Recognition via Collaborative Graph Network. 
      Chinese NER based on LSTM has problems
      Collaborative Graph Network
        Graph layer in NN
          C-graph : Character-Word connecting graph
          T-graph : Transition graph - to do with word-cutting / segmentation
          L-graph : Lattice graph - proposed by someone...
      Experiments
        Weibo NER - beat SOTA, 72% F1 overall
        OntoNotes : beat SOTA 74% F1
      Method also quite a bit faster to train : 6-15x speedup
    +Looking Beyond Label Noise: Shifted Label Distribution Matters in Distantly Supervised Relation Extraction. 
      Distance supervision of relations 
        But this is noisy or missing
        Selective attention; denoising; adversarial discrimiative denoising; soft-lable; cooperative denoising
        Shifted Label Distribution :: New problem found
          Bias adaptation technique : simple but effective
      Datasets : Testing across these showed up a problem across datasets
       KBP, NYT : Distantly supervised annotations: huge, but with problems
       TACRED : Human ennotated
      Heuristic threshold
        Classify relationship type
        Reject "ambiguous" predictions : Label them as NonType
        Based on max score, or entropy of distribution
        This works well on distantly-supervised datasets - but no effect on human-annotated TACRED
      Bias Adaptation
        Add a bias vector term to the logits prior to the softmax
    ."Easy First" Relation Extraction with Information Redundancy. 
      Simplify Integer Linear Programming task
        done for global relationship extraction
      By taking high-confidence local relationships out of the set of variables
      
    *Dependency-Guided LSTM-CRF for Named Entity Recognition. (SUTD, Singapore)
      statnlp.org
      Use dependency trees (mayne from Spacy) to figure out where entities are
        This is an important/surprising observation
      Model
        Do BERT or something to get embeddings
        BiLSTM 
        Add dependency-tree derived info
        interaction function g()
        Another BiLSTM
        CRF
      If g() is an MLP, then this is like a GCN
      Good results over baselines 
        Significantly better for lower-resource languages
        Major advantage is in longer NER
      But using predicted dependencies erode some of the performance
      
Main Conference Day 3
  Keynote : 
  
  Session 9C : Dialog & Interactive Systems II
    +Taskmaster-1: Toward a Realistic and Diverse Dialog Dataset. 
      New Dataset : 13k taskbased dialogs, in 6 domains
        Their research is focussed on end-to-end approach
      Approaches:
        Wizard of Oz : Crowdworker talks to call-center typist with TTS
        Self-dialog : Both sides created by one worker (tends to have higher perplexity)
      Annotations
        Label just the slot values [name.movie, name.theater]
        Also some .accept, .reject annotations
      Want realistic machine-human discourse
        Perhaps self-dialog is more interesting
        Include errors, repair and other common phenomena
      Also : Taskmaster I, and MultiWOZ
      Ratings : PPL, BLEU, LIKERT, ...
      Next (like WOZ...) : 20k 'soon', with competition (ideally)
      Links
        https://ai.google.com/tools/datsets/taskmaster-1
        taskmaster-datasets@googlegroups.com
        
    *Self-Assembling Modular Networks for Interpretable Multi-Hop Reasoning. (Session 9B)
      +Look at the different types of question
        "What the father of Kasper voted to be by the IFFHS in 1992?"               
          Linear chain reasoning
        "Were Scott Derrickson and Ed Wood of the same nationality?
          Parallel reasoning
      Decompose multihop into a strategy
        Like Neural Modular Netowkr (originally from VQA and CLEVR settings)
      Controller RNN 
        At each timestep, attention for words, and module probability
        "Find" : Scott Derrickson Nationality
        "Find" : Ed Wood Nationality
        "Compare" : ...
      Modules
        Find
        Relocate
        Compare
      Coordinated via a stack of attentions
      Extra logic to incentivise Find things during training
        Bridge-Entity supervision - this is extra data that had to be added (?)
      Doing this with BERT increases F1 from 70->71
      Acknowledgement : DARPA (YFA17-D17AP00022), Google, Bloomberg, NVidia, Salesforce, Amazon AWS
        ... faculty awards from Google, Facebook, and Salesforce
      
    *Build it Break it Fix it for Dialogue Safety: Robustness from Adversarial Human Attack. (Facebook)
      Protect system from unsafe dialog
        Useful : Wikipedia Toxic Comments dataset
        Nice stuff : ConvAI2 dataset
      BuildIt-BreakIt-FixIt : Repeatedly
        Best to optimise F1 on offensive examples (rather than overall F1)
        Annotators allowed to retry if system does catch them
      Test vs just having more data
        NO model in-the-loop
        Annotator score = number of times they can trick model out of 5 turns
        By round 3 - much more difficult to trick 
          4.5->1.5 scores
        Works well
      Try for multiple round convos
        Annotators found it easier to trick 'in context'
        Works - but needs BERT to tease out the contextualised abuse
      New related work : "Adversarial NLI : A new benchark" (on arxiv)
      URL :
        https://parl.ai/projects/dialogue_safety
    
    +GECOR: An End-to-End Generative Ellipsis and Co-reference Resolution Model for Task-Oriented Dialogue.
      Copy mechanism to fill in implicit coreferences
        Attention over context
        Then score based on completed dialog
      Also have a loss from NAME_SLOT genericised dialog 
      Created a new dataset based on existing dialog data
        Available online
      Results
        Good uplift in scores
        Copy mechanism particularly important
        End-to-end : Showed that ellipsis phenomena is significant
        
    *Task-Oriented Conversation Generation Using Heterogeneous Memory Networks. (Alibaba)
      Pipeline approach makes models brittle
      Related
        "A knowldege-grounded Neural Converstation Model" Ghazininejad AAAI 2018 
        Mem2seq ... for task-oriented dialog sstems
      Task
        Generate from History+KBtriples -> Response
      Combination of multiple memory stacks with a planning RNN (single-layer GRU)
        With copy mechanism
      Results
        Works (!), but somewhat incremental 
        Interesting to compare vs Interpretable multi-hop reasoning above

  Session 10C : Information Extraction III
    +CrossWeigh: Training Named Entity Tagger from Imperfect Annotations.
      CoNNL03 NER SoTA ~93%
      Annotation mistakes bias model evaluation
        They identified actual mistakes in CoNNL03 annotations
        5.38% of test set has annotation mistakes
        Revised dataset released in GitHub repo
          https://github.com/ZihanWangKi/CrossWeigh
      Trick : 
        Train in k-folds
        Reannotate left out fold and see whether there are potential mistakes
        Repeat process T times
        Finally, rewieght training set
          So that model doesn't focus on uncertain labels
      How to partition?
        Random isn't great : Better to use Entity Disjoint Filtering
          Don't repeat entities across train/test split in initial phase
            This does make a difference
      Results
        Decent uplift (particularly against corrected CoNLL03)
        Can also identify 80% of annotation mistakes
        T=3 and k=5,10 work fine

    +Phrase Grounding by Soft-Label Chain Conditional Random Field. (Session 10B)
      Ground here is identifying regions in image that correspond to words
        Existing methods work on each word independently
        Here, make this a sequential task
          Labels for words <-> regions in image
      But : labels here are not consistent between images
        Model transitiona and emission probabilities using a neural network
      Another issue : multiple bounding boxes are 'correct' for each phrase
        Often many decent boxes - found to be essential for good training
      Soft-label CRFs
        Multiple boxes can be judged vs ground truth on an IoU() basis
        Leads to looking at KL divergence loss between soft-labels (rather than hard-label loss)
      Decoding (test/predict)
        Need to use Viterbi to figure out which candidate bounding box to use
      Retults
        Visually, the soft-label CRF fixes up the grounding nicely
        https://github.com/liujch1998/SoftLabelCRF
    
    .Open Domain Web Keyphrase Extraction Beyond Language Modeling. (Microsoft/Bing)
      Keyphrase Extraction
        Useful for search and news-story clustering
        Different from topics (pre-defined, may not occur in text)
        Different from NER (more ambiguous, doesn't capture main intent)
      Created dataset for Keyphrase Extraction
        150k web documents, humanly annotated
        1-3 key phrases per doc
        66% human agreement rate on keyphrase@1
        Includes visual features (from rendering)
        Includes annotations for header/footer/clean body etc
        URL : https://github.com/microsoft/OpenKP
        Test set : 
          DUC-2001 (what 8 keyphrases per article)
          Only 309 documents
      Next steps : BERT
    
    *TuckER: Tensor Factorization for Knowledge Graph Completion.(re-read)
      Problem is cast as trying to predict values in sparse entity-relationship-entity graph
      Score function phi(es,r,eo) for each triple
        Linear models:
          RESCAL, overfiits
          DistMult, symmetric only
          ComplEx, extends DistMult to complex domain
          SimplE extends DistMlt with inverse relations
          TuckER (phi=W0 . es. Wr . eo) : enables multi-task learning
          ... previous ones are special cases of TuckER
      TuckER wins on lots of different tasks over other methods
        Beats both linear models and more complicated ones
      Also : 1909.11611 (downloaded)
    
    *Weakly Supervised Domain Detection. 
      Learn aggregation function across sentence multi-class classification scores
        Nice idea to learn the attention function driven by classifier errors
      Model named : DetNet and DetNet*
      Decent results
      Can also be applied in ranking/summarization tasks
      URL:
        https://github.com/yumoxu/detnet - code and data

  (Poster): 
    QuaRTz: An Open-Domain Dataset of Qualitative Relationship Questions. 
      Oyvind Tafjord, Matt Gardner, Kevin Lin and Peter Clark  
        
  Session 11D : Information Extraction IV
    -Coverage of Information Extraction from Sentences and Paragraphs
      Understand whether sentence states information exhaustively 
        (or there is extra stuff omitted)
      Grice maxims of cooperative communication (Logic and Conversation, 1975)
        Guide using : Maxim of quantity vs Maxim of relevance
      N-grams have informative features (SVM)
      LSTM over embedding results very similar to N-grams (with SVM)
      
    .HMEAE: Hierarchical Modular Event Argument Extraction. 
      Previous work was on Event Detection (75% F1)
      Event Argument extraction worse (59% F1)
      Improve by using concept hierarchy
        {PER/ORG}->{Seller, Buyer};  vs Time->TimeWithin
      Neural Module Networks : Hierarchical Modular Attention
        Imitating the concetpt hierarchical structure
          Superordinate Concept Module
          Argument Role Classifier
        Logic Union here was just average (but could be learned)
      HMEAE with a BERT initial encoder gives SOTA on 
        ACE 2005 task;
        TAC KBP 2016 
      Code and paper released
      
    *Entity, Relation, and Event Extraction with Contextualized Span Representations.
      Information extraction from unstructured -> structured
      Simple, general, span-based
      Pipeline :
        Input - contextualization - span enumeration - graph propagation - {Relations, Entities, Events}
      Modelling challenges
        Nested spans
        Long-range dependencies
      DyGIE++ (extension of Luan et al NAACL 2019)
      Window : Sentence +/- 1 sentence
        Graph propagation for 
          Coref
          Relations
          Events
      SOTA results for science articles on NER and Relationships
      Has BERT solved the IE pipeline : 
        Not yet...
        Coreference links offer valuable supervision
      
        
      
    
{% endhighlight %}


