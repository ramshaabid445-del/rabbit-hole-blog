// Shared data source for ArticlesScreen and ArticleDetailScreen
// Replace image URLs / content with your real data or hook this up to an API later.

// Curated detail illustrations. These are fixed direct image URLs rather than
// a random-image service, so every article keeps a clean editorial look.
const detailImageSets = {
  101: ['https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800'],
  201: ['https://images.pexels.com/photos/1402850/pexels-photo-1402850.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800'],
  301: ['https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/2653365/pexels-photo-2653365.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=800'],
  401: ['https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=800'],
  501: ['https://images.pexels.com/photos/262387/pexels-photo-262387.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/73873/pexels-photo-73873.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80'],
  601: ['https://images.pexels.com/photos/10574859/pexels-photo-10574859.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/2167967/pexels-photo-2167967.jpeg?auto=compress&cs=tinysrgb&w=800'],
  701: ['https://images.pexels.com/photos/2653365/pexels-photo-2653365.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/221024/pexels-photo-221024.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=800'],
  801: ['https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800'],
  901: ['https://images.pexels.com/photos/838644/pexels-photo-838644.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800'],
  1001: ['https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/207337/pexels-photo-207337.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/161276/moscow-cathedral-mosque-prospekt-mira-ramadan-sky-161276.jpeg?auto=compress&cs=tinysrgb&w=800'],
  1101: ['https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1266847/pexels-photo-1266847.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=800'],
  1201: ['https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/414085/pexels-photo-414085.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/2791276/pexels-photo-2791276.jpeg?auto=compress&cs=tinysrgb&w=800'],
  1301: ['https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/179296/pexels-photo-179296.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/32237/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800'],
  1401: ['https://images.pexels.com/photos/2526/pexels-photo-2526.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/931167/pexels-photo-931167.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/2365477/pexels-photo-2365477.jpeg?auto=compress&cs=tinysrgb&w=800'],
  1501: ['https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/907485/pexels-photo-907485.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/8542547/pexels-photo-8542547.jpeg?auto=compress&cs=tinysrgb&w=800']
};

const detailImages = (_topics, lock) => detailImageSets[lock];

const articlesData = [
  {
    id: 1,
    title: 'Simulation & Reality: Are We Living Inside a Simulation?',
    excerpt: 'Somewhere between philosophy and physics lies one of the most unsettling questions: what if everything we perceive — every memory, relationship, and breath — is nothing more than data running on a computer?',
    category: 'Simulation Theory',
    image: '/images/article1.jpeg',
    date: 'March 2, 2026',
    readTime: '6 min read',
    views: '14.2K',
    images: detailImages('simulation,technology', 101),
    content: [
      'Somewhere between a philosophy seminar and a late-night conversation with a close friend, the question always seems to come back around: what if none of this is real? Not in a dramatic, movie-poster way — just quietly, the way you wonder about it while waiting for tea to boil.',
      
      'Simulation theory, in its simplest form, suggests that what we experience as reality could be an incredibly advanced computer simulation, run by a civilization far more advanced than our own. It sounds like science fiction because, for a long time, it was. But in recent decades, serious thinkers have started treating it as a real philosophical possibility worth examining.',
      
      '<strong>Where the idea actually comes from</strong><br><br>The most well-known version of this argument comes from philosopher Nick Bostrom, who proposed something surprisingly logical: if it\'s possible for any civilization to eventually create simulations detailed enough to contain conscious beings, and if such a civilization would likely run many simulations rather than just one, then statistically, there are far more simulated minds in existence than \'original\' ones. Which means, purely by probability, we are more likely to be inside a simulation than outside of one.',
      
      'Think about it like this: if a future civilization has the computing power to run millions of realistic conscious simulations, and they choose to do so, then for every "real" person, there might be thousands or millions of simulated ones. The math is simple: the simulated vastly outnumber the original. So statistically, the odds that you\'re one of the originals are remarkably small.',
      
      '<blockquote>"The fact that our universe exhibits mathematical patterns doesn\'t prove it\'s a simulation — but it does suggest that whatever created it, if anything did, understands mathematics at a very deep level." — Nick Bostrom</blockquote>',
      
      'Bostrom\'s argument is not a claim that we definitely are simulated. It\'s closer to a thought experiment — one that asks us to take the mathematics of probability seriously, even when the conclusion feels unsettling. And perhaps that\'s the point: not to convince us we live in a simulation, but to show us how much of \'reality\' we simply accept without questioning.',
      
      '<strong>The \'glitches\' people point to</strong><br><br>You\'ve probably heard of the Mandela Effect — that phenomenon where large groups of people remember something differently from how it actually happened. Remember when C-3PO had silver legs in Star Wars, or when the Berenstain Bears were spelled "Berenstein"? These collective misrememberings have become poster children for simulation theory enthusiasts.',
      
      'Then there\'s déjà vu. That eerie feeling that you\'ve lived this exact moment before, down to the smallest detail. Scientists explain it as a neurological glitch, a momentary misfire between short-term and long-term memory. But for those open to the simulation idea, déjà vu feels like a skip in the recording, a moment when the simulation reloaded a frame incorrectly.',
      
      '<strong>What physicists say about the universe as code</strong><br><br>Perhaps the most compelling angle — and the one taken most seriously by actual scientists — involves the fundamental nature of reality itself. Modern physics has revealed that the universe appears to operate according to incredibly precise mathematical laws. Not just approximate laws, but exact equations that describe everything from the orbit of planets to the probability of quantum events.',
      
      'This mathematical underpinning isn\'t merely a convenient tool we invented to understand the world. The equations genuinely seem to describe how reality works at its deepest level. Why should the universe have such elegant, mathematical structure? It\'s a question that has puzzled physicists and philosophers for centuries.',
      
      '<blockquote>"If the universe were a simulation, we would expect it to have an information capacity limit, error correction mechanisms, and mathematical structure. All of these things we seem to observe." — Silas Beane, University of Bonn</blockquote>',
      
      '<strong>The counterarguments: Reality is real</strong><br><br>For every argument supporting simulation theory, there are equally strong rebuttals. Critics point out that simulation theory is essentially untestable in its current form. If we\'re living in a simulation built by an advanced civilization, how could we ever know? Any evidence we find could simply be part of the simulation itself.',
      
      'Others argue that simulation theory commits a fundamental error of reasoning: it assumes that consciousness can be reduced to computation. Philosopher John Searle\'s famous "Chinese Room" argument suggests that running the right program doesn\'t necessarily create genuine understanding or awareness. If consciousness isn\'t merely information processing, then even a perfect simulation of a brain wouldn\'t necessarily produce a conscious being.',
      
      '<strong>What the skeptics miss</strong><br><br>The most interesting aspect of simulation theory isn\'t whether it\'s true. It\'s what the question reveals about how we construct reality. Our entire lives are built on assumptions we never examine: that time flows forward, that objects exist when we\'re not looking at them, that other people are conscious like we are.',
      
      'Philosophy has challenged these assumptions for millennia. Descartes wondered if an evil demon might be manipulating his perceptions. The ancient Greeks had Plato\'s Cave, in which prisoners mistake shadows on a wall for reality. Each generation reinvents the question in language it understands. We\'ve moved from demons and caves to computers and simulations because that\'s the mythology of our age.',
      
      '<blockquote>"The lesson of the simulation argument isn\'t that we\'re living in a computer program. It\'s that certainty about reality is far more fragile than we like to believe." — David Chalmers, NYU</blockquote>',
      
      'There\'s something almost beautiful about the uncertainty. We spend so much of our lives obsessed with solidity — with pinning things down, defining them, securing them. But the universe keeps revealing layer after layer of strangeness beneath the surface. Quantum mechanics already told us that particles exist in multiple states simultaneously until measured. Simulation theory is just the next logical step: what if the measurement itself is part of the simulation?',
      
      'Whether or not we\'re inside someone else\'s simulation, we\'re still here. Still capable of awe. Still capable of asking questions that have no business being asked. And that, on its own, feels like something worth paying attention to.'
    ]
  },
  {
    id: 2,
    title: 'The Hidden Patterns of Nature: Why Mathematics Is the Universe\'s Secret Language',
    excerpt: 'From the spiral of a hurricane to the branching of a tree, the universe speaks in code. And that code happens to be mathematics.',
    category: 'Nature',
    image: '/images/article2.jpeg',
    date: 'Dec 22, 2025',
    readTime: '12 min read',
    views: '2.1K',
    images: detailImages('nature,mathematics', 201),
    content: [
      'Look around you. The leaf unfurling on the windowsill, the branching veins carrying water through its delicate structure, the galaxy spiraling overhead — all of it sings the same mathematical song. Patterns repeat across scales so vast and so small that the connections feel almost impossible.',
      
      'This is not poetic exaggeration. This is observation. Nature is not random. It is mathematical. And not in some vague, metaphorical sense — in the rigorous, provable, repeatable sense that would make any mathematician nod with quiet satisfaction. The same equations that describe a tornado also describe the whirlpool forming in your bathtub. The same geometry that positions seeds in a sunflower also structures the arrangement of planets in a solar system.',
      
      '<strong>Fibonacci and the golden ratio</strong><br><br>The most famous of these patterns is the Fibonacci sequence — a series where each number is the sum of the two preceding ones: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144. These numbers appear with remarkable frequency in nature. Flower petals often come in Fibonacci numbers: lilies have three, buttercups have five, daisies frequently have 34, 55, or even 89.',
      
      'Why? The answer lies in efficiency. Plants grow new cells from a central point called the meristem, and as those cells push outward, they naturally arrange themselves in spirals — the most efficient packing pattern available. The angle between successive leaves is typically around 137.5 degrees, which corresponds to the golden angle (360° divided by the golden ratio squared). This angle ensures that each new leaf gets maximum exposure to sunlight without casting shadow on the ones beneath it.',
      
      '<blockquote>"The laws of mathematics are as real as the laws of physics — because they are the laws of physics, expressed in numbers." — Max Tegmark, MIT</blockquote>',
      
      'The result is visible everywhere: in the scales of pinecones, the spirals of pineapples, the seeds of sunflowers, and the tendrils of climbing plants. If you look closely at a sunflower, you\'ll notice that the seeds arrange themselves in two interlocking spirals — one clockwise, one counter-clockwise. Almost inevitably, these spirals are consecutive Fibonacci numbers: 34 and 55, or 55 and 89.',
      
      '<strong>Fractals: Infinite complexity, finite rules</strong><br><br>Then there are fractals — geometric shapes that repeat infinitely at different scales. A coastline looks jagged from a satellite, jagged from an airplane, and jagged from a microscope. This self-similarity is not coincidence. It\'s the hallmark of fractal geometry, first seriously studied by mathematician Benoit Mandelbrot in the 1970s.',
      
      'Fractals appear throughout nature. Trees branch: the main trunk splits into large branches, which split into smaller ones, which split into twigs, which split into leaves. Each level of branching follows the same basic logic. Rivers split into tributaries, lungs split into bronchioles, lightning splits into branching bolts. The pattern is the same, repeated across scales.',
      
      '<strong>Spirals in galaxies and weather</strong><br><br>Turn your gaze upward and the patterns continue. Spiral galaxies — our Milky Way included — rotate in vast spirals that mirror the patterns seen in much smaller systems. Hurricanes and typhoons also spiral. The same forces — rotation plus pressure gradients — generate strikingly similar shapes regardless of scale.',
      
      '<blockquote>"The universe is written in the language of mathematics, and its characters are triangles, circles, and other geometric figures." — Galileo Galilei</blockquote>',
      
      'Perhaps the most extraordinary fact is that we can understand these patterns at all. Our brains, products of the same evolutionary processes that sculpted the Fibonacci spirals of pinecones and the branching of trees, have somehow developed the capacity to comprehend the mathematical architecture underlying all of it. Why? That\'s a question without a clear answer. But the fact that we can ask it — that we can look at a sunflower and see the Fibonacci sequence — is itself one of the strangest and most beautiful facts about being alive.'
    ]
  },
  {
    id: 3,
    title: 'The Quantum Mind: Does Your Brain Run on Quantum Physics?',
    excerpt: 'The most intimate mystery you will ever encounter — your own awareness — might require the strangest physics in the universe to explain.',
    category: 'Consciousness',
    image: '/images/article3.jpeg',
    date: 'Dec 20, 2025',
    readTime: '10 min read',
    views: '2.8K',
    images: detailImages('quantum,brain', 301),
    content: [
      'There is a question so strange, so fundamental, that it makes physicists and neuroscientists simultaneously excited and deeply uncomfortable: could your consciousness — the very experience of being you, right now, reading these words — be a quantum phenomenon?',
      
      'It sounds like science fiction. It sounds like someone has been watching too many movies about quantum healing and consciousness expansion. But beneath the New Age gloss, there is a serious, mathematically sophisticated argument that has occupied some of the most brilliant minds in theoretical physics and cognitive science for decades.',
      
      '<strong>The microscope problem</strong><br><br>Let\'s start with a hard truth: mainstream neuroscience genuinely does not know how consciousness arises. We can map which brain regions activate during specific experiences. We can observe neurons firing, neurotransmitters surging, blood flowing to active regions. But we have no explanation for why these physical processes generate subjective awareness — the feeling of seeing red, tasting coffee, or remembering your first day at school.',
      
      'This is called the "hard problem" of consciousness, and it remains, in the words of philosopher David Chalmers, "the largest explanatory gap in the life sciences." We can explain the information processing. We cannot explain the experience itself. And this gap has led some researchers to wonder: is consciousness something that emerges from classical computation, or does it require quantum mechanics to explain?',
      
      '<strong>What quantum mechanics actually is</strong><br><br>Before going further, a brief primer. Quantum mechanics describes the behavior of matter and energy at the smallest scales — atoms, electrons, photons. At this level, particles behave in ways that defy everyday intuition. They can exist in multiple states simultaneously (superposition). They can be "entangled," meaning two particles instantaneously influence each other regardless of distance. And until measured, their properties are not definite.',
      
      'These aren\'t philosophical metaphors. They are experimentally verified phenomena. Electrons passing through two slits simultaneously, quantum teleportation of information, entanglement verified over hundreds of kilometers — all real. And this raises a provocative question: if quantum effects are so strange and powerful at the microscopic level, could they play a role in the brain?',
      
      '<blockquote>"The brain is the most complex object we know of in the universe. If there\'s any system that might exploit quantum effects, it would be this." — Roger Penrose, Oxford University</blockquote>',
      
      '<strong>The Penrose-Hameroff theory</strong><br><br>The most famous quantum consciousness theory was proposed in the 1990s by mathematician and physicist Roger Penrose and anesthesiologist Stuart Hameroff. Their "Orchestrated Objective Reduction" (Orch-OR) theory argues that consciousness arises from quantum computations happening inside structures called microtubules — protein tubes found inside every cell, but especially concentrated in neurons.',
      
      'Penrose and Hameroff propose that these microtubules can maintain quantum coherence (quantum states working together in harmony) for surprisingly long periods, and that this quantum processing generates moments of conscious experience. Each moment of awareness, they suggest, corresponds to a specific quantum calculation reaching a threshold and "collapsing" into a definite state.',
      
      '<strong>The evidence for quantum effects in biology</strong><br><br>We used to believe that quantum mechanics couldn\'t operate inside warm, wet, noisy biological systems. The environment inside a cell would "decohere" quantum states almost instantly — destroying their delicate quantum properties before anything interesting could happen. But recent discoveries have shattered this assumption.',
      
      'Photosynthesis, it turns out, relies on quantum coherence. When a photon hits a photosynthetic complex, the energy doesn\'t randomly wander through the molecule. It simultaneously explores every possible path and "chooses" the most efficient one — a phenomenon called quantum walk. The system maintains quantum coherence for surprisingly long periods despite the warm, wet cellular environment.',
      
      '<blockquote>"Anyone who is not shocked by quantum theory has not understood it." — Niels Bohr</blockquote>',
      
      'Similarly, some species of birds use quantum entanglement to navigate. European robins, during migration, have a "quantum compass" in their eyes that allows them to detect Earth\'s magnetic field with extraordinary precision. The mechanism involves entangled electron pairs in specialized proteins called cryptochromes.',
      
      '<strong>The critics strike back</strong><br><br>For all its intellectual elegance, Orch-OR and related theories face serious objections. The primary criticism is that the brain is simply too warm, too wet, and too noisy for quantum coherence to last long enough to influence neural processing. Neurons operate on timescales of milliseconds; quantum decoherence in biological environments might happen in femtoseconds (millionths of a billionth of a second).',
      
      'Physicist Max Tegmark of MIT published a paper in 2000 calculating decoherence times for quantum states in neurons. His conclusion was brutal: quantum superposition in the brain would decohere in about 10⁻¹³ seconds — far too fast to influence neural computation.',
      
      'Whether or not Orch-OR proves correct, the quantum consciousness question has forced science to take phenomenology seriously. For decades, mainstream neuroscience tried to ignore subjective experience, reducing consciousness to information processing and neural correlates. The quantum theorists, even when wrong, have kept alive the idea that consciousness might be stranger and more fundamental than we imagine.'
    ]
  },
  {
    id: 4,
    title: 'If You Replaced Every Cell in Your Body… Are You Still the Same Person?',
    excerpt: 'The Ship of Theseus paradox, applied to your own biology — a journey through philosophy, neuroscience, and the nature of identity.',
    category: 'Philosophy',
    image: 'https://images.pexels.com/photos/11198495/pexels-photo-11198495.jpeg?auto=compress&cs=tinysrgb&w=1200',
    date: 'Dec 18, 2025',
    readTime: '9 min read',
    views: '1.8K',
    images: detailImages('human,cells', 401),
    content: [
      'There is a thought experiment so unsettling that it has haunted philosophers for more than two thousand years. Imagine a ship — let\'s call it the Ship of Theseus — whose planks are replaced one by one as they rot. Over years, every original piece of wood is swapped for new timber. When the final plank is replaced, is it still the same ship? Now imagine someone takes all the discarded original planks and reassembles them into a second ship. Which one is the true Ship of Theseus?',
      
      'This puzzle, recorded by the ancient Greek philosopher Plutarch, was once a riddle about wooden vessels and maritime identity. But modern biology has transformed it into something far more personal. Because here\'s the striking fact: almost every cell in your body is replaced over time. Your skin renews itself every few weeks. Your red blood cells turnover every four months. Your skeleton regenerates every decade. Even the neurons in your hippocampus — the brain region associated with memory — turn over at a measurable rate.',
      
      '<strong>The biological reality of constant replacement</strong><br><br>Let\'s make this concrete. Your body contains roughly 30 trillion cells. Each type of cell has its own lifespan. Epithelial cells lining your gut live only days. Liver cells can regenerate over months. Bone cells undergo continuous remodeling. Heart muscle cells were once thought to be irreplaceable, but recent research shows they also renew, albeit slowly — about 1% per year in a young adult.',
      
      'The scale of this replacement is staggering. Over the course of a human lifetime, the body produces roughly 500 pounds of new cells. You are, in a very real sense, a flowing river of matter — the same river, Heraclitus would say, into which you cannot step twice. The child you were has been entirely physically replaced by the adult you have become.',
      
      '<blockquote>"We are not the same persons, materially speaking, that we were seven years ago. But we are the same persons, psychologically speaking, that we were seven years ago." — John Stuart Mill</blockquote>',
      
      'And yet — and this is the remarkable part — you feel like the same person. Your memories connect continuously. Your personality has evolved but has a discernible through-line. You recognize yourself in old photographs. Something persists through the physical flux. But what?',
      
      '<strong>What philosophy says</strong><br><br>Philosophy has proposed several answers to this puzzle. The first is called "psychological continuity theory." According to this view, personal identity is not tied to physical substance at all. You are the same person over time because your psychology — your memories, beliefs, desires, and personality traits — forms a continuous chain linking your past self to your present self.',
      
      'This theory has strong intuitive appeal. It explains why we identify with our past experiences. It accounts for cases where the body changes dramatically but identity persists (amputees, accident survivors). It even handles thought experiments about brain transplants: if your brain were transferred to another body, where would you be? Most people say: in the new body, because that\'s where the psychology went.',
      
      '<strong>The Buddhist no-self view</strong><br><br>Two thousand years before modern neuroscience, Buddhist philosophers reached a remarkably similar conclusion. The doctrine of anatta, or "no-self," argues that what we call the self is an illusion produced by clinging to impermanent phenomena. Look inward, the Buddha taught, and you will find no unchanging essence — only a flowing stream of sensations, thoughts, and perceptions.',
      
      'The Buddha asked his followers to look inward and search for the self. Where is it? Is it in the body? The body is constantly changing. Is it in the feelings? Feelings come and go. Is it in the thoughts? Thoughts arise and pass away like clouds. In every case, what we find is not a fixed essence but a flowing stream of phenomena.',
      
      '<blockquote>"The self is not a thing, but a process. We are not nouns, but verbs in perpetual motion." — Daniel Dennett</blockquote>',
      
      'Perhaps the most compelling view today is that personal identity is a narrative achievement. We are not things but stories — not substances but processes of self-narration. From infancy, we begin constructing a story about ourselves. This narrative is constantly revised, updated, sometimes radically rewritten, but it provides the sense of continuity we call identity.',
      
      'This doesn\'t make identity less real. Rivers are real, even though they are processes, not objects. Hurricanes are real, even though they consist of constantly changing air and water. You are real, even if the cells that constitute you are in perpetual flux.'
    ]
  },
  {
    id: 5,
    title: "Black Holes: What Science Actually Knows (and What's Still a Total Mystery)",
    excerpt: 'The most extreme objects in the universe — where physics as we know it breaks down completely.',
    category: 'Cosmos',
    image: 'https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&w=1200',
    date: 'Dec 16, 2025',
    readTime: '11 min read',
    views: '4.5K',
    images: detailImages('blackhole,space', 501),
    content: [
      'There are places in the universe where the normal rules of physics simply cease to apply. Where matter collapses into infinite density. Where time slows to a standstill. Where light, the fastest thing in existence, cannot escape. These are black holes — and they are real. We have photographed them. We have heard them collide. We have traced the orbits of stars circling invisible masses millions of times heavier than our Sun.',
      
      'And yet, for all we know about them, black holes remain profoundly mysterious. They represent the boundary where our two most successful physical theories — general relativity and quantum mechanics — violently conflict. Inside a black hole, the smooth fabric of spacetime predicted by Einstein dissolves into a seething quantum mess we cannot yet describe.',
      
      '<strong>How black holes form</strong><br><br>Black holes are born from the death of massive stars. When a star at least twenty times the mass of our Sun exhausts its nuclear fuel, it can no longer support itself against its own gravity. The outward pressure from fusion ceases, and the star collapses inward with terrifying speed. In seconds, the core compresses from a sphere the size of Earth to a point smaller than a city.',
      
      'This collapse triggers a supernova — an explosion so energetic it can outshine an entire galaxy for weeks. The outer layers are blasted into space, enriching the interstellar medium with heavy elements that will later form new stars, planets, and eventually life itself. What remains at the center is a black hole.',
      
      '<blockquote>"Black holes are where God divided by zero." — Albert Einstein</blockquote>',
      
      'Not all black holes form this way. Far more common are stellar-mass black holes scattered throughout galaxies. Our Milky Way alone may contain tens of millions of them. Then there are the supermassive black holes that lurk at the centers of most galaxies, including our own. Sagittarius A*, the black hole at the Milky Way\'s core, weighs approximately four million solar masses.',
      
      '<strong>The event horizon: point of no return</strong><br><br>The defining feature of a black hole is its event horizon — the boundary beyond which nothing can escape. Once you cross this threshold, all paths lead inward. Even light, traveling at 299,792 kilometers per second, cannot find a trajectory out. This is why black holes are black: they emit no light, no signal, no information of any kind from within their boundaries.',
      
      'The event horizon is not a physical surface. You would not feel anything special crossing it. But from the perspective of an outside observer, something extraordinary happens: time appears to slow dramatically. An astronaut falling toward a black hole would experience time normally, but to someone watching from a safe distance, the astronaut would appear to slow, then freeze, then fade from view.',
      
      '<strong>The singularity: physics breaks down</strong><br><br>At the very center of a black hole lies the singularity — a point of infinite density where spacetime curvature becomes infinite and our current physical laws stop working. According to general relativity, all the mass of the black hole is compressed into a single mathematical point with zero volume. The predictions of the theory become nonsensical: infinite density, infinite curvature, infinite temperature.',
      
      'Physicists do not believe infinities represent actual physical reality. Instead, infinity in a physical theory usually signals that the theory has reached its limits of applicability. General relativity works beautifully everywhere except the singularity. What actually happens there requires a quantum theory of gravity — something we have not yet discovered.',
      
      '<strong>What we have actually observed</strong><br><br>For decades, black holes existed only as theoretical predictions. But starting in the 2010s, observational evidence began pouring in from multiple directions. In 2015, the LIGO observatory detected gravitational waves — ripples in spacetime — from the merger of two black holes over a billion light-years away. The signal matched the predictions of general relativity with extraordinary precision.',
      
      'Then in 2019, the Event Horizon Telescope released the first direct image of a black hole — supermassive M87*, 55 million light-years away. The image shows a bright ring of superheated gas surrounding a dark central shadow: the black hole\'s event horizon silhouetted against glowing material. Its size matched predictions perfectly.',
      
      '<blockquote>"The information paradox is telling us that our understanding of spacetime and quantum mechanics is incomplete. The solution will require a fundamental rethinking of both." — Leonard Susskind, Stanford University</blockquote>',
      
      'Black holes represent the ultimate boundary of knowledge. They are places where our understanding ends, where the universe conceals its inner workings behind an impenetrable veil. The quest to understand what lies beyond the event horizon is perhaps the greatest intellectual challenge of our time.'
    ]
  },
  {
    id: 6,
    title: 'The Fermi Paradox: If the Universe Is So Big, Where Is Everybody?',
    excerpt: "The universe contains billions of galaxies, each with billions of stars. So why haven't we found anyone out there?",
    category: 'Mysteries',
    image: 'https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'Dec 14, 2025',
    readTime: '7 min read',
    views: '2.6K',
    images: detailImages('galaxy,universe', 601),
    content: [
      'In 1950, the physicist Enrico Fermi was having lunch with colleagues at Los Alamos National Laboratory. The conversation turned to a recent wave of UFO sightings and a cartoon about aliens stealing trash cans. At some point, Fermi blurted out a question that has haunted astronomers and philosophers ever since: "Where is everybody?"',
      
      'The math seems straightforward. Our galaxy contains roughly 100 billion stars. A significant fraction have planets. A fraction of those planets sit in the habitable zone where liquid water can exist. If even a tiny fraction of those planets develop life, and an even tinier fraction develop intelligence, and an even tinier fraction develop technology capable of interstellar communication — there should still be thousands, perhaps millions, of technologically advanced civilizations in our galaxy alone.',
      
      'Some of them should have had time to spread across the galaxy. At sub-light speeds, a civilization could colonize the entire Milky Way in a few million years — a blink of an eye on cosmic timescales. We should see evidence of their presence: megastructures around stars, artificial signals, probes, or at least some sign that the universe has been shaped by intelligence. But we see nothing. The sky is silent. The galaxy appears empty.',
      
      '<strong>The Drake Equation</strong><br><br>In 1961, astronomer Frank Drake formalized this puzzle with his famous equation, which attempts to estimate the number of active, communicative civilizations in the Milky Way. The equation multiplies several factors: the rate of star formation, the fraction of stars with planets, the average number of habitable planets per system, the fraction where life emerges, the fraction where intelligence evolves, the fraction that develops detectable technology, and the average lifetime of such civilizations.',
      
      'The equation is not really a calculation. It is a framework for thinking about the problem. Plug in optimistic numbers and you get thousands of civilizations. Plug in pessimistic numbers and you get less than one — meaning we are likely alone. The wide range of possible answers reveals how little we actually know.',
      
      '<blockquote>"The absence of evidence is not evidence of absence — but in this case, the silence is deafening." — Jill Tarter, SETI Institute</blockquote>',
      
      '<strong>Solution 1: The Great Filter</strong><br><br>One of the most unsettling proposed solutions to the Fermi Paradox is the Great Filter hypothesis. Perhaps there is some step in the evolutionary chain — from dead matter to life to intelligence to interstellar civilization — that is extraordinarily difficult to pass. If the filter is behind us, we are rare but safe: we have already beaten the odds. If the filter is ahead of us, we are in trouble: most civilizations fail before reaching interstellar capability, and we may be next.',
      
      'Candidate filters include: the origin of life itself (maybe abiogenesis is fantastically rare), the emergence of complex cells (it took two billion years for eukaryotes to appear on Earth), the development of multicellularity, the evolution of intelligence, the transition to technological civilization, or the survival of technological adolescence — the period between acquiring nuclear weapons and achieving sustainable global civilization.',
      
      '<strong>Solution 2: The Zoo Hypothesis</strong><br><br>Maybe they are out there, but they are deliberately avoiding contact. Perhaps there is a galactic convention — an ethical principle similar to the "Prime Directive" from Star Trek — that prohibits interference with emerging civilizations until they reach a certain level of development. We are being observed but not contacted, allowed to develop at our own pace until we are ready for the broader galactic community.',
      
      'This hypothesis has a certain appeal. It explains the complete absence of evidence while preserving the possibility that intelligent life is common. But it requires a level of galactic coordination and patience that seems implausible across civilizations that may have arisen millions of years apart and have no common evolutionary heritage.',
      
      '<blockquote>"The universe is a big place, maybe the biggest. If there is intelligent life out there, it is either already here, or it is not. The fact that we do not see it suggests either that we are alone, or that intelligent beings do not survive long enough to make themselves visible." — Carl Sagan</blockquote>',
      
      'Perhaps the most sobering solution is that civilizations arise frequently but do not last long. The transition to technological capability brings with it existential risks: nuclear war, engineered pandemics, ecological collapse, runaway artificial intelligence. Each new technological breakthrough may be a test that most civilizations fail.',
      
      'But the most important thing we can do is look inward. The Fermi Paradox may be telling us that the hardest part of becoming a spacefaring civilization is surviving the first few centuries of technological capability. Perhaps the universe is not silent because life is rare, but because intelligent life rarely lives long enough to make itself heard.'
    ]
  },
  {
    id: 7,
    title: 'The Mathematics of Consciousness: Can Awareness Be Measured?',
    excerpt: 'A bold new theory suggests consciousness is not mysterious — it is quantifiable. Here is what the math actually says.',
    category: 'Consciousness',
    image: 'https://images.pexels.com/photos/2653365/pexels-photo-2653365.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'Dec 22, 2025',
    readTime: '10 min read',
    views: '1.9K',
    images: detailImages('consciousness,neuron', 701),
    content: [
      'For most of human history, consciousness has been treated as a mystery — something too subjective, too qualitative, too personal to be studied with the tools of science. You cannot put awareness in a test tube. You cannot weigh a thought or measure the redness of red. But a growing movement in neuroscience and philosophy argues that this is changing. Consciousness, they claim, can be quantified. And the key to doing so is mathematics.',
      
      'The most developed attempt to mathematize consciousness is called Integrated Information Theory, or IIT. Developed by psychiatrist and neuroscientist Giulio Tononi in the early 2000s, IIT proposes that consciousness is not something mysterious that emerges from the brain. It is a specific type of information structure — one that can, in principle, be measured with a single number called phi (Φ).',
      
      '<strong>Integrated Information Theory explained</strong><br><br>IIT starts from five axioms — basic truths about consciousness that seem self-evident once you state them. Consciousness exists (intrinsic existence). It is specific (every experience has its own particular contents). It is unified (you experience a single scene, not scattered fragments). It is definite (you experience one thing at a time, not a blur of overlapping experiences). And it is informative (each experience rules out an enormous number of alternatives).',
      
      'From these axioms, IIT derives a mathematical quantity: integrated information. A system has high integrated information if it has many elements that interact in specific ways, creating a unified whole that is more than the sum of its parts. The human brain, with its 86 billion neurons and roughly 100 trillion synapses, has enormous integrated information. A photodiode, which simply turns light into voltage, has almost none.',
      
      'The math involves calculating all possible ways a system could be partitioned and measuring how much the system\'s behavior changes when it is in different states. The more integrated the information — the less the system can be broken into independent parts without losing its essential character — the higher the phi, and the more conscious the system.',
      
      '<blockquote>"Consciousness is not a binary property. It is a spectrum, and we can locate systems at different points on that spectrum by measuring their integrated information." — Giulio Tononi</blockquote>',
      
      'IIT makes predictions that are testable. It predicts that a system with high phi is conscious. It predicts that destroying connections between neurons reduces consciousness. It predicts that certain configurations of matter are conscious while others are not, regardless of what they do. This last claim has made the theory controversial: IIT suggests that a simple grid of logic gates arranged in a specific pattern could, in principle, be conscious — not because it computes anything, but because of its internal information structure.',
      
      '<strong>The Global Workspace Theory</strong><br><br>IIT is not the only mathematical theory of consciousness. Another major framework is Global Workspace Theory (GWT), developed by psychologist Bernard Baars and later formalized by neuroscientist Stanislas Dehaene. GWT proposes that consciousness works like a theater stage: most brain processes happen backstage, in the unconscious. When information enters consciousness, it is broadcast to the entire brain — made available to memory, decision-making, language, and action.',
      
      'Mathematically, GWT can be modeled using dynamical systems theory and network science. The brain is treated as a network of nodes (neurons or brain regions) with specific connectivity patterns. Consciousness arises when information achieves a certain threshold of global accessibility — when it is transmitted across multiple specialized networks and integrated into a coherent whole.',
      
      '<strong>Can a number capture what it feels like to be you?</strong><br><br>The most common objection to mathematical theories of consciousness is that mathematics is about quantities and relations, while consciousness is about quality — the what-it-feels-like of experience. Philosopher David Chalmers calls these the easy problems and the hard problem. The easy problems concern information processing, behavior, and cognitive function. The hard problem is subjective experience: why should physical processes feel like anything at all?',
      
      'Proponents of mathematical consciousness theories argue that the hard problem is a conceptual confusion. Once you have the right mathematical structure — a system with sufficiently high integrated information or global workspace accessibility — consciousness is not an extra ingredient. It is what it feels like to be that system.',
      
      '<blockquote>"The feeling of being alive is not a ghost in the machine. It is the machine itself, perceived from the inside." — Christof Koch</blockquote>',
      
      'Whether or not Integrated Information Theory is ultimately correct, it represents a genuine advance in how we think about consciousness. For centuries, the mind was considered too subjective for science. IIT treats consciousness as an objective, measurable property — not by reducing it to neurons or chemicals, but by identifying the mathematical relationships that underlie it.',
      
      'If successful, this would transform not just neuroscience but ethics, law, and artificial intelligence. We would have a principled way to determine which systems deserve moral consideration. We would know whether a sophisticated AI is genuinely conscious or merely simulating consciousness.'
    ]
  },
  {
    id: 8,
    title: 'Fibonacci in Nature: The Divine Pattern',
    excerpt: 'How a simple sequence shapes everything around us — from flower petals to spiral galaxies.',
    category: 'Nature',
    image: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'Dec 20, 2025',
    readTime: '8 min read',
    views: '2.3K',
    images: detailImages('fibonacci,nature', 801),
    content: [
      'There is a number sequence so simple that a child can learn it in minutes, yet so profound that it appears to describe the fundamental geometry of the universe. Start with 0. Add 1 to get 1. Then add the previous two numbers: 0+1=1, 1+1=2, 1+2=3, 2+3=5, 3+5=8, 5+8=13. The sequence continues indefinitely: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610…',
      
      'This is the Fibonacci sequence, named after the 13th-century Italian mathematician Leonardo of Pisa, who introduced it to Western mathematics in his book Liber Abaci. But the sequence itself was known to Indian mathematicians centuries earlier. And here is the truly remarkable fact: long before any mathematician wrote it down, nature had already been using it.',
      
      '<strong>The mathematics of the sequence</strong><br><br>To understand why Fibonacci numbers appear in nature, we must first understand their mathematical properties. The ratio of any two consecutive Fibonacci numbers approaches a remarkable value: approximately 1.6180339887… This number, known as the golden ratio and denoted by the Greek letter phi (Φ), has fascinated mathematicians, artists, and architects for millennia.',
      
      'The golden ratio has extraordinary mathematical properties. It is the only number that is one greater than its reciprocal: Φ = 1 + 1/Φ. This self-referential quality gives it a special status in mathematics. Geometrically, a rectangle whose sides are in the golden ratio is called a "golden rectangle." If you remove a square from such a rectangle, the remaining rectangle is itself a smaller golden rectangle.',
      
      '<blockquote>"The golden ratio is the most difficult to express, and the most irrational of all numbers." — Johannes Kepler</blockquote>',
      
      '<strong>Flowers and the Fibonacci code</strong><br><br>One of the most accessible places to observe Fibonacci numbers is in flowers. Count the petals of a lily: three. A buttercup: five. A delphinium: eight. A marigold: thirteen. A daisy: frequently 34, 55, or even 89. These numbers are not arbitrary. They reflect the Fibonacci sequence.',
      
      'The reason lies in the geometry of plant growth. Plants produce new cells from a central growing point called the meristem. As cells are added, they push outward in a spiral pattern determined by the golden angle — 137.5 degrees. This angle is 360° divided by the square of the golden ratio (360/Φ² ≈ 137.5°). Why this angle? Because it is the most efficient packing angle possible.',
      
      'The result is visible everywhere: in the scales of pinecones, the spirals of pineapples, the seeds of sunflowers, and the tendrils of climbing plants. If you look closely at a sunflower, you\'ll notice that the seeds arrange themselves in two interlocking spirals — one clockwise, one counter-clockwise. Almost inevitably, these spirals are consecutive Fibonacci numbers: 34 and 55, or 55 and 89.',
      
      '<strong>Why this matters: mathematics discovered, not invented</strong><br><br>The most profound implication of Fibonacci in nature is what it tells us about the relationship between mathematics and reality. Did we invent mathematics, or did we discover it? The Fibonacci sequence existed in its full infinitude long before any human being existed to count it. The spiral of the nautilus predates any observer by hundreds of millions of years.',
      
      'The universe operates according to mathematical laws that we did not create and cannot change. We can understand these laws — a privilege that sets us apart from every other species on Earth — but we did not invent them. They are as ancient as the stars and as fundamental as gravity. When we recognize the Fibonacci sequence in a sunflower or a galaxy, we are not imposing our categories on nature. We are recognizing a pattern that was always there, waiting to be seen.'
    ]
  },
  {
    id: 9,
    title: 'Neural Networks vs Human Brain: The Deep Similarities and Critical Differences',
    excerpt: 'Artificial intelligence was built by studying the brain. But how close are we really to creating machine minds?',
    category: 'Science',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=80',
    date: 'Dec 18, 2025',
    readTime: '9 min read',
    views: '3.0K',
    images: detailImages('neural,brain', 901),
    content: [
      'Every time you marvel at how well ChatGPT writes, or watch a self-driving car navigate city streets, you are witnessing the power of artificial neural networks — computer systems loosely inspired by the human brain. The analogy seems natural: neurons in the brain connect in layers, processing information as it flows from input to output. Artificial neural networks do the same, with mathematical "neurons" arranged in layers that pass weighted signals to one another.',
      
      'But here is the crucial fact that often gets lost in the excitement: the similarity between biological and artificial neural networks is largely superficial. Yes, both systems involve interconnected nodes that process and transmit signals. Beyond that, the differences are profound — in architecture, learning mechanisms, energy consumption, and perhaps most importantly, in what they actually understand.',
      
      '<strong>The architecture of intelligence</strong><br><br>Let\'s start with structure. The human brain contains approximately 86 billion neurons, each connected to thousands of others through synapses. The total number of synaptic connections is estimated at 100 trillion. These connections are not random; they form highly organized circuits with specialized regions for vision, language, movement, memory, and emotion.',
      
      'Artificial neural networks, by contrast, are dramatically simpler. Even the largest language models have parameters (artificial "synapses") numbering in the hundreds of billions — comparable to the brain\'s synaptic count. But the architecture is fundamentally different. Biological neurons communicate using electrochemical signals that can be excitatory or inhibitory. Artificial neurons simply multiply inputs by weights and pass the result through an activation function.',
      
      '<blockquote>"The brain is not a computer. It is a living, breathing, adapting organ that has been shaped by hundreds of millions of years of evolution. Any comparison between the two must begin with humility." — Nobel laureate Eric Kandel</blockquote>',
      
      'More importantly, biological neural networks are not layered in the same way as artificial ones. The brain has recurrent connections — neurons that connect backward and sideways, creating feedback loops and complex dynamic interactions. Most artificial networks, until recently, were strictly feedforward: information moves in one direction, from input layer through hidden layers to output.',
      
      '<strong>How learning works: fundamentally different mechanisms</strong><br><br>The most critical difference lies in how these systems learn. Artificial neural networks rely on backpropagation — a mathematical algorithm that calculates the difference between the network\'s output and the desired output, then propagates this error backward through the network to adjust weights. It is an elegant optimization technique, but it is also biologically implausible. Real neurons do not calculate derivatives and send error signals backward through synapses.',
      
      'Biological learning is more complex and multifaceted. At the cellular level, synaptic plasticity mechanisms like long-term potentiation (LTP) and long-term depression (LTD) strengthen or weaken connections based on patterns of activity. These mechanisms depend on precise molecular cascades involving neurotransmitters, receptors, and protein synthesis.',
      
      '<strong>Energy efficiency: a staggering gap</strong><br><br>One of the most humbling comparisons concerns energy consumption. The human brain runs on approximately 20 watts of power — roughly the energy consumption of a dim lightbulb. It processes complex sensory information, generates consciousness, controls movement, stores memories, and produces thought and emotion, all while sipping energy.',
      
      'Training a large language model like GPT-4 consumed an estimated 1,000 megawatt-hours of electricity — enough to power hundreds of homes for a month. The energy cost of inference (running the trained model) is also substantial, though much lower than training. Even so, a single forward pass through a large model uses orders of magnitude more energy than the brain uses to perform comparable cognitive tasks.',
      
      '<blockquote>"Intelligence is not just about processing information. It is about being the kind of creature that has needs, moves through space, and interacts with a world that pushes back." — roboticist Rodney Brooks</blockquote>',
      
      'The brain also learns continuously and unsupervised. We are always learning, even when we are not trying to — extracting patterns from the ambient stream of sensory experience. Modern AI, by contrast, requires carefully curated datasets separated into training and testing sets. It learns in discrete phases, with explicit objectives defined by human designers. The brain\'s ability to learn without explicit objectives, from raw experience, remains largely unmatched in artificial systems.'
    ]
  },
  {
    id: 10,
    title: 'Sacred Geometry in Ancient Architecture: The Mathematical Code Behind the World\'s Most Mysterious Buildings',
    excerpt: 'From the pyramids of Giza to Gothic cathedrals, ancient builders embedded precise mathematical ratios into their most sacred structures. Was this mere aesthetics, or something deeper?',
    category: 'Religion & God',
    image: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'Dec 16, 2025',
    readTime: '10 min read',
    views: '2.0K',
    images: detailImages('sacred,architecture', 1001),
    content: [
      'Stand before the Great Pyramid of Giza and look up. Each of its four sides is almost perfectly aligned to the cardinal directions — north, south, east, west — with an accuracy that would be challenging to replicate even with modern surveying equipment. The pyramid\'s original height divided by its base length gives a number remarkably close to 2π. The ratio of its base perimeter to its height approximates 2π × 2.',
      
      'This is not an isolated example. From the temples of ancient India to the cathedrals of medieval Europe, builders across cultures and centuries have consistently incorporated specific geometric ratios into their most important structures. These proportions — the golden ratio, π, √2, and various Pythagorean relationships — appear too frequently and too precisely to be accidents.',
      
      '<strong>The Egyptian mastery of geometry</strong><br><br>The ancient Egyptians are often credited with originating what we now call sacred geometry. Their civilization depended on precise measurements for everything from agricultural taxation to monumental construction. The Rhind Mathematical Papyrus, dating to around 1550 BCE, contains problems that demonstrate sophisticated understanding of geometry — including calculations of areas, volumes, and the slopes of pyramids.',
      
      'The Great Pyramid itself is a masterclass in geometric precision. Its base covers 13 acres and is level to within less than an inch across its entire 756-foot span. Each face was originally covered in polished white limestone, creating a smooth surface that gleamed in the desert sun. The pyramid\'s original height was 481 feet. The ratio of height to base is approximately 1.57, remarkably close to π/2.',
      
      '<strong>The Parthenon and the golden ratio</strong><br><br>Move forward in time to ancient Greece, and geometry becomes not just practical but philosophical. The Greeks regarded certain proportions as inherently beautiful and used them extensively in architecture. The Parthenon, built on the Acropolis in Athens between 447 and 432 BCE, is often cited as a masterpiece of golden ratio composition.',
      
      'The relationship between the Parthenon\'s width and height approximates the golden ratio. The spacing of its columns follows geometric progressions. The temple\'s facade can be inscribed within a golden rectangle with remarkable precision. Whether the Greeks consciously used the golden ratio or achieved these proportions through aesthetic intuition is debated, but the result is undeniably harmonious.',
      
      '<blockquote>"Geometry is knowledge of the eternally existent." — Pythagoras</blockquote>',
      
      '<strong>The Gothic cathedral: reaching toward infinity</strong><br><br>Perhaps the most ambitious expression of sacred geometry in Western architecture is the Gothic cathedral. Beginning in the 12th century and flourishing for three centuries, Gothic architecture pursued an almost fanatical commitment to geometric proportion, all in service of creating a space that would inspire awe and point toward the divine.',
      
      'The pointed arch, the defining feature of Gothic architecture, is not arbitrary. Its shape follows a geometric curve that distributes weight more efficiently than the rounded Roman arch, allowing builders to construct taller, more slender structures. The ribbed vault ceiling directs weight downward through a network of geometric ribs, creating interiors that soar upward with seemingly impossible lightness.',
      
      'Chartres Cathedral, built between 1194 and 1220, exemplifies these principles. Its proportions are based on a complex geometry involving equilateral triangles and hexagons. The cathedral\'s width, height, and length are related by ratios that approximate musical harmonies. The famous labyrinth embedded in its floor tiles follows a geometric pattern that has been interpreted as a symbol of the spiritual journey.',
      
      '<strong>Islamic architecture: geometry as prayer</strong><br><br>Islamic art and architecture took geometric design to perhaps its highest refinement. The aniconic tradition in Islam — the avoidance of representational imagery in religious contexts — led artists and architects to develop increasingly sophisticated geometric patterns as a form of visual prayer.',
      
      'Islamic geometric patterns are built on mathematical principles of tessellation and symmetry. The Alhambra in Granada, Spain, constructed mainly between 1333 and 1391, contains some of the most complex geometric tile work ever created. Its patterns utilize mathematical relationships discovered in the West only centuries later.',
      
      'Perhaps the deepest lesson of sacred geometry is that mathematical beauty and spiritual meaning are not opposed. The same ratios that describe the spiral of a galaxy also describe the proportions of a Gothic cathedral. The universe is mathematical at every scale, and human beings, products of that universe, naturally resonate with mathematical harmony when we encounter it.'
    ]
  },
  {
    id: 11,
    title: 'The Ship That Never Stops: Identity Across Time',
    excerpt: 'What really makes you "you" from one year to the next — a journey through the philosophy of personal identity.',
    category: 'Philosophy',
    image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'Dec 12, 2025',
    readTime: '8 min read',
    views: '1.4K',
    images: detailImages('ship,ocean', 1101),
    content: [
      'There is a question that follows you through every stage of life, though you may never pause to ask it explicitly: what makes you the same person you were ten years ago? The child who learned to ride a bike. The teenager who fell in love for the first time. The young adult who graduated, moved cities, grieved losses, celebrated triumphs. Somewhere along that chain of experience, something persists — a continuous "you" that connects all these versions of yourself.',
      
      'Personal identity is one of the oldest and most stubborn problems in philosophy. For over two millennia, thinkers have tried to pin down the essence of selfhood — that mysterious continuity that makes you, you. The answers they have proposed range from the commonsensical to the revolutionary, and each reveals something important about how we understand ourselves and our place in the world.',
      
      '<strong>The commonsense view: we are substances</strong><br><br>Most people, most of the time, operate with an implicit theory of identity that philosophers call "substance dualism" or, more simply, the soul view. You are the same person over time because you have an underlying essence — a soul, a self, a "you" — that persists through all the changes in your body, mind, and experience.',
      
      'This view has deep intuitive appeal. It explains why we feel continuous with our past selves. It accounts for our sense of moral responsibility: the person who committed a crime ten years ago is the same person being punished today. It resonates with religious traditions that posit an immortal soul that survives bodily death.',
      
      '<strong>Locke\'s memory theory</strong><br><br>The philosopher John Locke, writing in the 17th century, proposed a radically different answer. Personal identity, he argued, is not a matter of having an unchanging substance. It is a matter of memory. You are the same person over time because you remember your past experiences and can connect them to your present. Memory is the thread that weaves discrete moments into a continuous narrative.',
      
      'Locke\'s theory has strengths. It explains why we identify with our past actions and experiences: we remember doing them. It handles cases where the body changes dramatically but identity persists (amputees, accident survivors). It accounts for our intuitions about responsibility: if you cannot remember committing a crime, we are less inclined to hold you fully responsible.',
      
      '<blockquote>"I know that I exist because I am conscious of my own existence. But what I am — that is the difficult question." — John Locke</blockquote>',
      
      'But memory theory also faces serious problems. Memories are notoriously unreliable. We forget vast swaths of our lives. We misremember details. We incorporate fictional elements into our recollections. If identity depends on memory, does forgetting a childhood event mean you are no longer the same person as the child who experienced it?',
      
      '<strong>Parfit\'s reductionism: the self as narrative</strong><br><br>Perhaps the most influential modern treatment of personal identity comes from philosopher Derek Parfit, whose 1984 book Reasons and Persons presented a view he called "reductionism." Parfit argued that personal identity is not a deep, further fact beyond our physical and psychological continuity. Instead, it is something we construct — a story we tell ourselves to make sense of our lives.',
      
      'What matters, Parfit argues, is not identity but continuity. We do not need a deep, further fact of identity to make sense of moral responsibility, self-interest, or personal relationships. What matters is that there are overlapping chains of memory, belief, desire, and personality that connect our past and future selves.',
      
      '<strong>The Buddhist no-self: anatta</strong><br><br>Two thousand years before Parfit, Buddhist philosophers arrived at a strikingly similar conclusion. The doctrine of anatta, or "no-self," is one of the Three Marks of Existence in Buddhism. It teaches that what we call the self is not a real, enduring entity but an illusion — a mental construct produced by clinging to impermanent physical and mental processes.',
      
      'The Buddha asked his followers to look inward and search for the self. Where is it? Is it in the body? The body is constantly changing. Is it in the feelings? Feelings come and go. Is it in the thoughts? Thoughts arise and pass away like clouds. In every case, what we find is not a fixed essence but a flowing stream of phenomena.',
      
      '<blockquote>"We are all stories, in the end. The question is whether we write our own." — Adapted from Ursula K. Le Guin</blockquote>',
      
      'This is not to say that Buddhism denies that there is experience, that there is agency, that there is moral responsibility. It simply denies that these phenomena require an underlying "self" to own them. You can act responsibly without positing a permanent self — just as you can walk without positing a permanent walker, or think without positing a permanent thinker.'
    ]
  },
  {
    id: 12,
    title: 'Is Time an Illusion? What Physics Says',
    excerpt: 'Why some physicists think the flow of time is not fundamental — and what that means for our experience of reality.',
    category: 'Science',
    image: 'https://images.pexels.com/photos/29614016/pexels-photo-29614016.jpeg',
    date: 'Dec 10, 2025',
    readTime: '11 min read',
    views: '2.7K',
    images: detailImages('time,clock', 1201),
    content: [
      'You are sitting somewhere right now, reading these words. You remember the moment you woke up this morning, the coffee you drank, the events that led you here. Your past stretches behind you, your future lies ahead, and you feel yourself moving through time like a traveler passing through a landscape. It feels like the most basic fact of existence: time flows, and you are flowing with it.',
      
      'But what if this feeling is an illusion? What if the past, present, and future are not fundamentally different, and the "flow" of time is not a feature of the universe but a feature of your perception? This is not a new-age speculation. It is one of the most radical and well-supported conclusions of modern physics.',
      
      '<strong>The block universe</strong><br><br>Einstein\'s theory of general relativity, our best description of gravity and the large-scale structure of spacetime, treats time as just another dimension — mathematically equivalent to the three dimensions of space. In the equations, there is no fundamental distinction between "past," "present," and "future." They all exist simultaneously, like different locations along a line.',
      
      'This leads to the "block universe" model of spacetime. Imagine the universe not as a movie unfolding frame by frame, but as a complete block of spacetime — a four-dimensional entity in which every event that ever has happened or will happen is already "there," frozen in its place. Your birth, your childhood, this moment reading these words, your death — all exist eternally in the block, like frames in a filmstrip laid out all at once.',
      
      'On this view, time does not "pass" in any objective sense. The passage of time is an artifact of human consciousness — a way our minds experience the block from a particular perspective, moving through it like a cursor moving through text. The cursor feels like it is moving because it is highlighting different parts of the document, but the document itself is static.',
      
      '<blockquote>"The distinction between past, present, and future is only a stubbornly persistent illusion." — Albert Einstein</blockquote>',
      
      '<strong>The physics of timelessness</strong><br><br>General relativity describes spacetime as a unified entity. The equations are symmetric with respect to time: they work exactly the same whether time runs forward or backward. At the fundamental level, there is no arrow of time. The equations do not distinguish between "before" and "after."',
      
      'This is deeply counterintuitive because our experience of time is thoroughly asymmetric. We remember the past but not the future. We can influence the future but not the past. Causes precede effects. Eggs break but do not unbreak. Physics explains the arrow of time through the concept of entropy — the measure of disorder in a system. The second law of thermodynamics states that the total entropy of a closed system always increases over time.',
      
      '<strong>The problem of time in quantum gravity</strong><br><br>While general relativity treats time as a dimension, quantum mechanics treats it as an external parameter — a clock against which quantum systems evolve. In quantum mechanics, time is not dynamical; it is fixed and absolute. This discrepancy between how general relativity and quantum mechanics treat time is one of the central problems in the search for a theory of quantum gravity.',
      
      'In approaches to quantum gravity like loop quantum gravity and string theory, time may not be fundamental. It might emerge from something more basic — a pre-temporal substrate in which time as we know it does not exist. Some theorists propose that time is an approximate, macroscopic phenomenon, like temperature or pressure, which emerge from the collective behavior of microscopic degrees of freedom but are not fundamental at the deepest level.',
      
      '<strong>Does the arrow of time matter?</strong><br><br>Whether time is fundamentally flowing or static has profound implications. If the block universe is correct, then every moment of your life is equally real and equally permanent. The child you were, the adult you will become, the moment of your death — all exist eternally. This can be a source of comfort: nothing is ever truly lost. Or it can be a source of horror: every painful moment is forever fixed, eternally present in the block.',
      
      'The present moment — this one, right now — is all we ever actually experience. Whether it is a sliding window on an eternal block or a genuine emergence of novelty from an open future, it is what we have. To be fully present is not just a spiritual cliché. It is the deepest acknowledgment we can make of the structure of reality: this moment is all there ever is.'
    ]
  },
  {
    id: 13,
    title: 'The Multiverse: Parallel Realities Explained',
    excerpt: 'Breaking down the different multiverse theories in plain language — from inflationary cosmology to quantum mechanics.',
    category: 'Cosmos',
    image: 'https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'Dec 8, 2025',
    readTime: '9 min read',
    views: '3.6K',
    images: detailImages('multiverse,space', 1301),
    content: [
      'Think about this: somewhere in the vast architecture of reality, there is a universe where you are reading these words but with blue hair. Another where you decided not to read anything at all today. Another where the atoms that compose you arranged themselves differently and you were never born. These are not flights of fancy. They are predictions of some of our most successful physical theories.',
      
      'The multiverse is one of the most controversial ideas in modern science. On one hand, it emerges naturally from well-established theories like inflationary cosmology and quantum mechanics. On the other hand, it seems untestable, unfalsifiable, and more like science fiction than science. The debate about the multiverse is, in many ways, a debate about what science should be: should it only concern itself with what can be directly observed, or should it pursue truth wherever mathematics leads?',
      
      '<strong>Level 1: The infinite space beyond our horizon</strong><br><br>The simplest form of multiverse requires only one assumption: space is infinite (or very, very large) and matter is distributed roughly uniformly. In an infinite universe, every possible arrangement of matter that can fit within a given volume will eventually be realized somewhere. Since there are only finitely many ways particles can be arranged within any observable volume, and space is infinite, every arrangement must appear infinitely many times.',
      
      'This means there are infinitely many Earths, each with variations. Some are identical to ours. Others differ in small ways. Some differ in large ways. In this infinite space, there is a planet identical to Earth where you are reading these words with blue hair. There is also a planet identical to Earth but where you stopped reading three sentences ago.',
      
      '<blockquote>"The universe is not only queerer than we suppose, but queerer than we can suppose." — J.B.S. Haldane</blockquote>',
      
      '<strong>Level 2: Bubble universes with different physics</strong><br><br>Inflationary cosmology also predicts a richer variety of universes. In eternal inflation models, inflation never completely ends everywhere. Instead, it stops in localized regions, creating "pocket universes" or "bubble universes" separated by eternally inflating space. Each bubble universe can have different physical constants — different strengths of fundamental forces, different numbers of spatial dimensions, different masses for elementary particles.',
      
      'This is the multiverse of string theory\'s "landscape" — the vast number of possible vacuum states predicted by the theory. String theory suggests that extra dimensions beyond the familiar four (three space, one time) can be compactified in many different ways, each producing a universe with different low-energy physics. Estimates suggest the landscape may contain on the order of 10^500 possible configurations — a number so large it makes "billion" seem puny.',
      
      '<strong>Level 3: The many-worlds interpretation</strong><br><br>Perhaps the most philosophically radical multiverse emerges from quantum mechanics. Hugh Everett\'s "many-worlds interpretation" (MWI) of quantum mechanics proposes that every quantum measurement causes the universe to split into multiple branches, each containing a different outcome.',
      
      'In the famous thought experiment of Schrödinger\'s cat, a cat in a sealed box is both alive and dead until observed. In the Copenhagen interpretation (the traditional view), the act of observation "collapses" the wave function, randomly selecting either alive or dead. In MWI, both outcomes occur. The universe splits: in one branch, the cat is alive; in another, it is dead. Both branches are equally real.',
      
      '<blockquote>"I find it rather easy to imagine that the many-worlds interpretation is true. The hard part is imagining that it is not." — David Deutsch</blockquote>',
      
      'Many physicists reject MWI because it seems extravagant. But proponents argue that it is the simplest interpretation of quantum mechanics, requiring no mysterious collapse mechanism. The equations of quantum mechanics, when taken literally, describe a multiverse.',
      
      'Whether or not the multiverse exists, the fact that our best theories predict it forces us to confront deep questions about the nature of scientific truth. Is science only about what we can observe directly? Or does it encompass whatever our most reliable theories suggest? The multiverse pushes at the boundaries of what we are willing to accept as real — and in doing so, it reveals that reality may be far stranger, and far larger, than we ever imagined.'
    ]
  },
  {
    id: 14,
    title: 'Why Do We Dream? The Mystery of Sleep',
    excerpt: 'What neuroscience actually knows about why we dream — and why every night your brain embarks on one of the most bizarre adventures of your life.',
    category: 'Consciousness',
    image: 'https://images.pexels.com/photos/935777/pexels-photo-935777.jpeg?auto=compress&cs=tinysrgb&w=1200',
    date: 'Dec 6, 2025',
    readTime: '7 min read',
    views: '2.2K',
    images: detailImages('dream,sleep', 1401),
    content: [
      'Every night, without fail, you enter one of the most mysterious states of existence known to science. For roughly two hours total spread across your sleep cycle, your brain generates a vivid, immersive, often illogical simulation of reality. You fly. You fall. You show up to an exam naked. You talk to people who are dead. You experience all of this with full emotional intensity, convinced that it is real, until you wake up.',
      
      'Dreaming is one of the oldest puzzles of human consciousness. Ancient civilizations interpreted dreams as messages from gods, portals to other realms, or windows into the future. Modern neuroscience has taken a more sober approach, but the fundamental mystery remains: why do we dream? What is the function of these nightly hallucinations?',
      
      '<strong>The science of sleep stages</strong><br><br>To understand dreaming, we must first understand the sleep stages in which it occurs. Sleep is not a uniform state. It cycles through distinct phases, each characterized by different brain activity patterns. A complete sleep cycle lasts about 90 minutes and repeats four to six times per night.',
      
      'The cycle begins with light sleep (Stage 1), transitions to moderate sleep (Stage 2), then deep sleep (Stages 3 and 4, also called slow-wave sleep). After deep sleep, the brain ascends back through lighter stages and enters rapid eye movement (REM) sleep — the stage most associated with vivid dreaming. During REM sleep, the brain becomes highly active, almost as active as during wakefulness, while the body remains paralyzed, preventing us from acting out our dreams.',
      
      '<strong>The memory consolidation hypothesis</strong><br><br>One of the most well-supported theories of dreaming is that it plays a role in memory consolidation — the process by which short-term memories are transferred to long-term storage. During deep sleep, the brain appears to consolidate declarative memories (facts, events, knowledge). During REM sleep, it may consolidate procedural memories (skills, habits) and emotional memories.',
      
      'Research shows that learning a new skill increases REM sleep duration. Rats navigating mazes exhibit patterns of brain activity during REM that resemble their waking experience. These findings suggest that dreaming is not random but actively involved in processing and integrating memories.',
      
      '<strong>The emotional processing theory</strong><br><br>Closely related to memory consolidation is the theory that dreams serve primarily emotional functions. REM sleep is characterized by high activity in the amygdala — the brain\'s emotion-processing center — and reduced activity in the prefrontal cortex, which normally regulates emotional responses. This combination creates a state where emotional material is processed without the usual waking inhibitions.',
      
      'Psychiatrist Ernest Hartmann has proposed that dreams serve a "quasi-therapeutic" function, allowing the brain to process emotionally charged experiences in a safe, simulated environment. By replaying emotional memories during REM, the brain can integrate them, reduce their emotional intensity, and store them in a more adaptive form.',
      
      '<blockquote>"Dreams are the kingdom of the soul, where the laws of nature are suspended and the mind roams free." — Sigmund Freud</blockquote>',
      
      '<strong>The threat simulation theory</strong><br><br>One of the more provocative theories of dreaming comes from cognitive scientist Antti Revonsuo, who argues that dreams evolved primarily as threat simulation systems. According to this view, the ancestral environment was full of dangers — predators, hostile humans, natural hazards. Dreaming provided a safe space to rehearse responses to these threats, improving the dreamer\'s chances of survival when actual threats occurred.',
      
      'Revonsuo points out that dreams are disproportionately threatening and negative. Studies show that about 70-80% of dreams contain at least one threatening event, and the dreamer is typically the target. Dreams often involve being chased, attacked, or endangered — classic threat scenarios that would have been relevant in ancestral environments.',
      
      '<strong>Lucid dreaming: when the dreamer wakes up</strong><br><br>One of the most fascinating phenomena in dream research is lucid dreaming — the state where the dreamer becomes aware that they are dreaming while still inside the dream. Once this insight occurs, the dreamer can sometimes take control of the dream environment, flying, summoning objects, or changing the dream narrative at will.',
      
      'Lucid dreaming has been scientifically confirmed. In sleep labs, lucid dreamers can signal to researchers by moving their eyes in a predetermined pattern. These studies show that lucid dreaming involves activation of the prefrontal cortex — the region associated with metacognition and self-awareness — which is normally suppressed during REM.',
      
      'Perhaps the most profound lesson of dream research is that the brain never truly rests. Even in the deepest sleep, it is active, processing, creating. The dream state is not a departure from consciousness but a different mode of consciousness — one that connects us to our emotional cores, our memories, our primal fears and hopes.'
    ]
  },
  {
    id: 15,
    title: 'Climate Tipping Points: What the Data Shows',
    excerpt: 'The thresholds that could trigger irreversible environmental change — and why the next decade may be the most critical in human history.',
    category: 'Environment',
    image: 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'Dec 4, 2025',
    readTime: '10 min read',
    views: '3.1K',
    images: detailImages('climate,environment', 1501),
    content: [
      'There is a concept in climate science so alarming that even the scientists who study it struggle to find adequate words. It is the idea of "tipping points" — thresholds in the Earth\'s climate system beyond which certain changes become self-reinforcing, irreversible on human timescales, and capable of triggering cascading effects that could transform the planet we call home.',
      
      'These are not distant hypotheticals. They are processes that may already be underway. The Amazon rainforest, which produces much of its own rainfall and stores enormous carbon, may be approaching a transition to savanna. The West Antarctic Ice Sheet, containing enough water to raise global sea levels by several meters, may have already crossed a point of no return. The Gulf Stream, which moderates Northern Europe\'s climate and drives global weather patterns, is slowing at a rate that has scientists deeply concerned.',
      
      '<strong>What is a tipping point?</strong><br><br>A tipping point in climate science is a critical threshold where a small change in forcing (temperature, precipitation, carbon concentration) produces a disproportionately large, often abrupt, change in the system. The system "tips" from one stable state into another. The classic example is a bathtub filled with water. As you increase the flow, the water level rises gradually until it reaches the overflow point. At that threshold, a small additional input produces a sudden, irreversible change: the tub floods.',
      
      'Climate systems can have multiple stable states. The Amazon rainforest is one such system. It creates its own rainfall through transpiration — trees release water vapor, which forms clouds and falls as rain, sustaining the forest. If deforestation and warming reduce tree cover sufficiently, rainfall declines. Less rain means more tree death, which means less rainfall, creating a feedback loop that eventually transforms the forest into grassland.',
      
      '<strong>The ice sheets: sleeping giants</strong><br><br>The most dangerous tipping points involve the planet\'s ice sheets — Greenland, West Antarctica, and potentially East Antarctica. These contain enough ice to raise sea levels by many meters. The Intergovernmental Panel on Climate Change (IPCC) has long been conservative about ice sheet dynamics, partly because the processes are complex and not fully understood. But recent research suggests the ice sheets are far more vulnerable than previously thought.',
      
      'Greenland is losing ice at an accelerating rate. Between 1992 and 2020, Greenland lost approximately 4,700 billion tons of ice, contributing about 13 millimeters to global sea level. The rate of loss has increased from roughly 30 billion tons per year in the 1990s to over 300 billion tons per year in the 2010s. This acceleration suggests that dynamic processes — not just surface melting but glacier flow and calving — are becoming more active.',
      
      '<blockquote>"We are the first generation to feel the effects of climate change and the last generation that can do something about it." — Barack Obama</blockquote>',
      
      '<strong>The Atlantic Meridional Overturning Circulation (AMOC)</strong><br><br>The AMOC is a vast system of ocean currents that transports warm water from the tropics toward the North Atlantic, releasing heat into the atmosphere and driving weather patterns across the Northern Hemisphere. It includes the Gulf Stream, which keeps Northern Europe significantly warmer than it would otherwise be at its latitude.',
      
      'The AMOC is driven by differences in water density: warm, salty water flows north, cools, sinks, and returns south at depth. This "conveyor belt" is now slowing. Since the 1950s, the AMOC has weakened by approximately 15%. Climate models project further weakening as warming and ice melt freshen the North Atlantic, reducing water density and slowing the sinking process.',
      
      'A full collapse of the AMOC would have catastrophic regional impacts. Northern Europe would cool dramatically, possibly by 5-10°C within decades. The Amazon could experience severe droughts. The West African monsoon would shift southward, disrupting agriculture. Sea levels on the U.S. East Coast would rise faster than global averages.',
      
      '<strong>The Amazon dieback</strong><br><br>The Amazon rainforest is the largest tropical forest on Earth, covering 5.5 million square kilometers across nine countries. It contains 10-15% of the world\'s terrestrial species, stores approximately 150-200 billion tons of carbon, and generates much of its own rainfall through transpiration. But this entire system is under threat from deforestation, fires, and climate change.',
      
      'Deforestation in the Amazon has reduced forest cover by approximately 20% since pre-industrial times. Scientists estimate that at 20-25% deforestation, the forest may reach a tipping point where it can no longer sustain its rainfall regime. At that point, the eastern, southern, and central Amazon could transition to savanna-like conditions within decades.',
      
      '<blockquote>"The climate is a common good, belonging to all and meant for all. Climate change is a global problem with grave implications: environmental, social, economic, political." — Pope Francis, Laudato Si</blockquote>',
      
      '<strong>Permafrost thaw and the methane bomb</strong><br><br>Permafrost — permanently frozen ground that covers approximately 25% of the Northern Hemisphere\'s land surface — contains an estimated 1,500 billion tons of organic carbon, roughly twice the amount currently in the atmosphere. As the Arctic warms at three to four times the global average, permafrost is thawing, releasing carbon dioxide and methane — a far more potent greenhouse gas — into the atmosphere.',
      
      'This creates a dangerous positive feedback loop: warming causes permafrost thaw, which releases greenhouse gases, which causes more warming, which causes more thaw. The concern is that this feedback could become self-sustaining, driving additional warming even if human emissions cease.',
      
      '<strong>The path forward</strong><br><br>Climate tipping points represent the boundary between manageable change and planetary transformation. They are nature\'s warning signs — indications that the Earth system is under stress and approaching thresholds beyond which recovery will be impossible. The science is clear. The solutions are available. What remains is the collective will to act before it is too late.',
      
      'The next decade will likely be the most critical in human history. Decisions made between now and 2035 will determine whether we stay below 1.5°C warming or sail past it. We are the first generation to understand the physics of climate tipping points. We are the last generation that can prevent the worst from happening.'
    ]
  }
];

export default articlesData;
