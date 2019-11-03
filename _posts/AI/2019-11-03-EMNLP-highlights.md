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
      Need entity filtering
        Nut this is not enough
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
      
    
    
    
  
  "Controllable Language Generation" - Minlie Huang (Tsinghau University)
  
    
  




{% endhighlight %}


