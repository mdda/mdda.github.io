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
  

TextGraphs 2019
  https://sites.google.com/view/textgraphs2019/program
  Posters = 16:00–17:20
  




{% endhighlight %}


