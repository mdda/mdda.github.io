---
layout: post
category: AI
title: Musings about Backpropagation
tagline: Why is Random so good?
date: 2016-09-29
tags: [NeuralNetworks]
published: false
---
{% include JB/setup %}



## Musings : Mechanisms of Learning

### Things to Ponder

*   Random matrix ops on error terms work
    *   Perhaps there is something more informative (but still ~local) than 'random'

*   Perhaps the back-prop chain could be self-improving, just like the forward pass

*   In auto-encoders, the criteria for 'goodness' are :
    *   Recreate input as accurately as possible
    *   Recreate original input when noise added before processing

*   RNN ideas in 'SARM' look interesting
    *   Is fixed-point of RNN anything relevant?  (or is it an 'artifact' of iteration)
    *   Can RNN weight adjustments be turned to find fixed point explicitly
    *   But SARM had issues in getting results - either:
        *   The paper was just completely fake
        *   The train/test mistakes will soon be made kosher (not worth time to replicate)
        *   There was something there, but simplification to single-iteration missed the big picture
    *   May be too time-consuming to replicate experimental setup - and then make an additional advance
        *   Also, the SARM ideas may be tainted for a while
        
           
*   For regular deep 'featurization', PCA seems competitive
    *   However, PCA is trying to get the 'right answer' in a single step
        *   And there is also the issue of having a 'most significant bit'
    *   But dropout works well, which seems to argue against having a feature 'pecking order'
        *   What would 'dropout-PCA' look like, where reconstruction was hindered by random dropouts?



### Interesting 'other stuff' (Word Embedding enhancements)

*   For embeddings, sparsification works well for word similarities, but not for word analogies
    *   Perhaps because the geometry of a sparse non-negative space is so different from original regular n-dimensional embedding space
    *   But sparse embedding can be 'reconstituted' into the regular space using full matrix
        *   Does that matrix need to be correct (and/or what resolution)?  
        *   Or would a random matrix work just as well?

*   What's all this graph embedding stuff?  :  
    *   [Retrofitting Word Vectors to Semantic Lexicons](https://arxiv.org/abs/1411.4166)
        *   https://github.com/mfaruqui/retrofitting 
    *   [An Ensemble Method to Produce High-Quality Word Embeddings](https://arxiv.org/pdf/1604.01692v1.pdf)
        *   https://github.com/commonsense/conceptnet-numberbatch
    *   [Large Scale Distributed Semi-Supervised Learning Using Streaming Approximation](http://www.jmlr.org/proceedings/papers/v51/ravi16.pdf)
    


### Papers to Digest : Progress

#### Done - Relevant

Feedback Alignment

*  ["Direct Feedback Alignment Provides Learning in Deep Neural Networks"](https://arxiv.org/abs/1609.01596)
  *   https://github.com/anokland/dfa-torch

Relevant alternative backprop derivation :

*  [Mates of Costate](http://www.argmin.net/2016/05/18/mates-of-costate/)
*  [Mechanics of Lagrangians](http://www.argmin.net/2016/05/31/mechanics-of-lagrangians/)

#### Done - Less relevant (for now)

*   _LowBitwidthTraining_1606.06160v2.pdf


#### ToDo  - Relevant

_achlioptas_ApplicationsOfRandomMatrices_mmds.pdf
_ADMM-for-Hashing_1604.01475v1.pdf
_Bengio-2015_EnergyInferenceApproximatesBackProp_1510.02777v2.pdf
_Bengio_e-prop_1602.05179v4.pdf
_DeepWeightRobustness_1606.01981v1.pdf
_GAN-Improvements_1606.03498v1.pdf
_Hernandez-Lobato-2015_ProbabalisticBackpropagation_1502.05336v1.pdf
_ICSC16-v1.41-hus.pdf
_LossSurfaceOfDeepNets_1412.0233.pdf
_MaximalSparsityWithDeepNetworks_1605.01636v2.pdf
_PiotrMirowski_2014_ReviewAutoEncoders.pdf
_Schmidthuber-2015_LearningToThink_1511.09249v1.pdf
_WeightSymmetryImportance_1510.05067v3.pdf
_withdrawn_SARM_1608.04062v1.pdf

#### ToDo  - Less relevant (for now)

'_Benefits to NER, Relation Extraction, Link Analysis, and Inference.pdf'
_Facebook-FastText_1607.01759v2.pdf
_Facebook-subwords_1607.04606v1.pdf
_CountsAndRL_1606.01868v1.pdf
_LearningGDwithGD_1606.04474v1.pdf
'_Lenat Witbrock Cyc Shades of KRR.pdf'
_OriginAndStructureOfNames_763_Paper.pdf
_ProgressNN-for-RL_1606.04671v2.pdf
_Wav2Letter_1609.03193v2.pdf


#### Re-Study  - Relevant

Bengio-2014_TargetPropagation_1407.7906.pdf
CorEx1-2014_5580-discovering-structure-in-high-dimensional-data-through-correlation-explanation.pdf
CorEx2-2014_1410.7404v2.pdf
DeepMind-2016_DeCouplingGradients_1608.05343v1.pdf
DoNetworksNeedToBeDeep_1312.6184.pdf
Lillicrap-2014_RandomFeedbackWeights_1411.0247v1.pdf
Maryland-2016_ADMM_1605.02026v1.pdf
Nokland-2016_FeedbackAlignment_1609.01596v1.pdf
PCAnet-2014_1404.3606v2.pdf
RNN-ResNet-and-the-Cortex_1604.03640v1.pdf

#### Re-Study  - Less relevant (for now)

Bendale-2015_OpenClasses_1511.06233v1.pdf
DeepClustering-CocktailParty_TR2016-003.pdf
GoodFellow-2015_Optimisation-is-StraightLine_1412.6544v5.pdf

