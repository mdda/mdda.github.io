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
    Very nice diagram of effect of adding MMD regularization
    
      
    
    
    













{% endhighlight %}


