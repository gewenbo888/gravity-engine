import { Bi } from "./lang";

/* ============================================================
   THE TEN SYSTEMS
   ============================================================ */
export type Section = { num: string; id: string; title: Bi; sub: Bi; body: Bi };

export const SECTIONS: Section[] = [
  {
    num: "01", id: "history",
    title: { en: "The History of Gravity", zh: "引力的历史" },
    sub: { en: "From things that fall to the shape of the cosmos", zh: "从坠落之物，到宇宙的形状" },
    body: {
      en: "For most of human history, falling was not a mystery to be solved but a fact too obvious to question. Aristotle taught that heavy things seek their natural place at the center of the world, and that the heavens obeyed different laws than the earth. It took two thousand years to dismantle that intuition. Galileo rolled balls down ramps and found that all objects fall the same way, regardless of weight. Newton then made the audacious leap: the force pulling an apple down is the very same force holding the Moon in its orbit — one law for heaven and earth. Einstein went deeper still, erasing the force entirely and replacing it with the geometry of spacetime. Today we listen to gravity as sound, watch it bend starlight, and suspect it may emerge from something deeper than space itself. The history of gravity is the history of humanity learning to mistrust the obvious.",
      zh: "在人类历史的大部分时间里，「坠落」并非一个有待解开的谜，而是一个明显到无须追问的事实。亚里士多德教导说，重物寻求它们在世界中心的「自然位置」，而天界遵循着与地界不同的法则。拆解这种直觉，花了两千年。伽利略让小球滚下斜面，发现一切物体——无论轻重——都以同样的方式坠落。随后，牛顿做出了那个大胆的飞跃：把苹果拽向地面的力，与维系月亮在轨道上的力，是同一种力——天与地，一条法则。爱因斯坦走得更深，他干脆抹去了「力」，代之以时空的几何。今天，我们把引力当作声音来聆听，看着它弯折星光，并怀疑它或许从某种比空间本身更深的东西中涌现。引力的历史，是人类学会不信任「显而易见」的历史。",
    },
  },
  {
    num: "02", id: "newton",
    title: { en: "Newtonian Gravity", zh: "牛顿引力" },
    sub: { en: "Universal attraction — one law binds apple, Moon and tide", zh: "万有引力——一条法则，统辖苹果、月亮与潮汐" },
    body: {
      en: "Newton's insight was not that gravity exists, but that it is universal: every mass attracts every other mass, anywhere in the universe, with a force that grows with their masses and falls off as the square of the distance between them, F = G·m₁m₂/r². From this single equation pours an entire cosmos of behavior — the parabola of a thrown stone, the ellipse of a planet, the timing of the tides, the precession of the equinoxes, the return of a comet predicted to the year. For the first time, the same mathematics governed the fall of an apple and the orbit of the Moon. Newton unified the heavens and the earth into one lawful system, and in doing so created the template for all of physics: find the law, write the equation, and let it predict the future.",
      zh: "牛顿的洞见，不在于「引力存在」，而在于它是「万有」的：每一个质量都吸引着宇宙中任何地方的每一个其他质量，其力随质量增大、随它们之间距离的平方而衰减，F = G·m₁m₂/r²。从这一个方程里，倾泻出一整个宇宙的行为——掷出石块的抛物线、行星运行的椭圆、潮汐的涨落、二分点的岁差、被预言到具体年份的彗星回归。人类第一次，用同样的数学，统辖了苹果的坠落与月亮的轨道。牛顿把天与地统一进了同一个有律可循的系统，并由此为整个物理学立下了范式：找到法则，写下方程，再让它去预言未来。",
    },
  },
  {
    num: "03", id: "relativity",
    title: { en: "Spacetime Curvature", zh: "时空曲率" },
    sub: { en: "Gravity is not a force — it is geometry", zh: "引力不是一种力——它是几何" },
    body: {
      en: "Einstein noticed something Newton had missed: a person in free fall feels no gravity at all. From that single clue — the equivalence of falling and floating — he rebuilt the universe. Mass and energy, he showed, curve the four-dimensional fabric of spacetime, and what we call gravity is simply matter following the straightest possible path through that curved geometry. A planet does not feel a force pulling it toward the Sun; it coasts in a straight line through a valley the Sun has carved in spacetime. 'Matter tells spacetime how to curve; spacetime tells matter how to move.' This is general relativity, and it is not a refinement of Newton but a replacement: time runs slower deep in a gravity well, light bends as it passes a star, orbits slowly precess, and the universe itself can expand. Every prediction has been confirmed, often to absurd precision. Gravity, it turns out, is the shape of reality.",
      zh: "爱因斯坦注意到了牛顿遗漏的东西：一个自由下落的人，根本感受不到引力。从这个唯一的线索——坠落与漂浮的等价——出发，他重建了宇宙。他证明，质量与能量弯曲着时空这四维的织物，而我们所谓的「引力」，不过是物质沿着那弯曲几何中最直的可能路径前行。行星并不感到有一种力把它拽向太阳；它只是在太阳于时空中刻出的山谷里，沿着直线滑行。「物质告诉时空如何弯曲；时空告诉物质如何运动。」这便是广义相对论——它不是对牛顿的修补，而是替换：在引力阱深处，时间走得更慢；光经过恒星时会弯折；轨道会缓慢进动；而宇宙本身可以膨胀。每一项预言都被证实，往往精确到荒谬的程度。原来，引力，就是现实的形状。",
    },
  },
  {
    num: "04", id: "blackhole",
    title: { en: "Black Holes & Singularities", zh: "黑洞与奇点" },
    sub: { en: "Where curvature runs to infinity and time stops", zh: "曲率奔向无穷、时间就此停止之处" },
    body: {
      en: "Push the equations of general relativity to their limit and they produce a monster: a region where spacetime curves so steeply that nothing — not even light — can climb back out. This is a black hole, and its boundary, the event horizon, is a one-way membrane in the fabric of reality. To a distant observer, time itself appears to freeze at the horizon; an infalling clock seems to slow and redden into silence. Inside lurks the singularity, a point where density and curvature become infinite and the known laws of physics break down. Yet black holes are not perfectly black: Hawking showed that quantum effects at the horizon make them glow faintly and slowly evaporate. This sets a deep paradox — if a black hole swallows information and then evaporates, where does the information go? The answer may require uniting gravity with quantum mechanics, which is why these objects sit at the very frontier of physics.",
      zh: "把广义相对论的方程推到极限，它们会造出一头怪物：一个时空弯曲得如此陡峭、以至于任何东西——连光也不例外——都无法重新爬出的区域。这就是黑洞，而它的边界「事件视界」，是现实织物中一层单向的薄膜。对一个遥远的观察者而言，时间本身仿佛在视界处冻结；一只坠入的钟，似乎放慢、变红，最终归于沉寂。其内部潜伏着奇点——一个密度与曲率变为无穷、已知物理定律就此失效的点。然而黑洞并非全黑：霍金证明，视界处的量子效应令它们微微发光，并缓慢蒸发。这埋下了一个深刻的悖论——若黑洞吞下信息、随后蒸发殆尽，那信息去了哪里？答案或许需要把引力与量子力学统一起来——正因如此，这些天体，正端坐在物理学最前沿的边缘。",
    },
  },
  {
    num: "05", id: "waves",
    title: { en: "Gravitational Waves", zh: "引力波" },
    sub: { en: "The universe rings — and now we can hear it", zh: "宇宙在鸣响——而我们如今能听见它" },
    body: {
      en: "If spacetime is a fabric, then violently accelerating masses should make it ripple — and Einstein predicted exactly this in 1916, then doubted such waves could ever be detected. They are absurdly faint: when two black holes collided a billion light-years away, the wave that reached Earth stretched the entire planet by less than the width of a proton. Yet in 2015, the LIGO detectors caught it — a rising 'chirp' as two black holes spiraled together and merged in a fifth of a second, releasing more power than all the stars in the visible universe combined, entirely as ripples in spacetime. We had opened a new sense. Where telescopes see light, gravitational-wave observatories feel the shudder of spacetime itself, hearing colliding black holes and neutron stars that emit no light at all. The universe, it turns out, is not silent. It rings like a struck bell, and we have finally built an ear.",
      zh: "如果时空是一块织物，那么剧烈加速的质量就应当让它泛起涟漪——爱因斯坦在1916年正是如此预言的，随后又怀疑这样的波是否可能被探测到。它们微弱得近乎荒谬：当两个黑洞在十亿光年之外相撞，抵达地球的那道波，把整颗行星拉伸的幅度，还不到一个质子的宽度。然而在2015年，LIGO探测器捕捉到了它——一段上扬的「啁啾」，两个黑洞旋转着靠拢、在五分之一秒内并合，所释放的功率超过可见宇宙中所有恒星的总和，且完全以时空涟漪的形式释放。我们由此开启了一种新的感官。望远镜看见光，而引力波天文台感受着时空本身的颤栗，听见那些根本不发光的黑洞与中子星的碰撞。原来，宇宙并不沉默。它像一口被敲响的钟那样鸣响，而我们终于造出了一只耳朵。",
    },
  },
  {
    num: "06", id: "quantum",
    title: { en: "Quantum Gravity", zh: "量子引力" },
    sub: { en: "The two pillars of physics refuse to stand together", zh: "物理学的两根支柱，拒绝并立" },
    body: {
      en: "Twentieth-century physics rests on two triumphant theories that flatly contradict each other. General relativity describes gravity as smooth, curved, deterministic spacetime — perfect for stars and galaxies. Quantum mechanics describes everything else as discrete, probabilistic, and fundamentally jittery — perfect for atoms and particles. Each is confirmed to extraordinary precision in its own domain, and each breaks the other where they overlap: the heart of a black hole, the first instant of the Big Bang, the Planck scale where spacetime itself should fluctuate and foam. Attempts to forge a quantum theory of gravity have produced some of the most beautiful and untested ideas in science: the graviton, a particle that would carry the force; loop quantum gravity, where space comes in indivisible atoms; string theory, where everything is vibration in extra dimensions; and the holographic principle, which hints that gravity is not fundamental at all. Reconciling them may be the deepest unsolved problem in physics.",
      zh: "二十世纪的物理学，建立在两个各自凯旋、却彼此正面冲突的理论之上。广义相对论把引力描述为光滑、弯曲、决定论的时空——完美适用于恒星与星系。量子力学则把其余一切描述为离散、概率性、本质上颤动不止的——完美适用于原子与粒子。各自在自己的领地中被证实到极其精确的程度，又在二者重叠之处彼此击溃：黑洞的核心、大爆炸的最初一瞬、以及时空本身都应当涨落起沫的普朗克尺度。锻造一个量子引力理论的种种尝试，催生出科学中最美丽却最未经检验的一些构想：引力子，一种将携带此力的粒子；圈量子引力，其中空间以不可分割的「原子」出现；弦论，其中万物皆是额外维度中的振动；以及全息原理，它暗示引力根本就不是基本的。调和它们，或许是物理学中最深的未解难题。",
    },
  },
  {
    num: "07", id: "cosmos",
    title: { en: "Cosmic Structure & Dark Matter", zh: "宇宙结构与暗物质" },
    sub: { en: "Gravity built the universe — out of something we cannot see", zh: "引力建造了宇宙——用某种我们看不见的东西" },
    body: {
      en: "On the largest scales, gravity is the only architect. Starting from almost perfectly smooth beginnings, it patiently amplified the faintest density ripples into stars, galaxies, clusters, and a vast filamentary web of matter threading the dark — the cosmic web, the largest structure in existence. But when astronomers weighed the galaxies, the numbers refused to add up. Stars at the edges of spinning galaxies orbit far too fast; clusters bend light far too strongly. There is roughly five times more gravitating mass than all the visible stars and gas combined — invisible, untouchable 'dark matter' that emits no light and passes through ordinary matter like a ghost. Stranger still, the expansion of the universe is accelerating, driven by a 'dark energy' that makes up most of the cosmos and acts like anti-gravity. Together, the things we can see — every star, planet and person — amount to under five percent of the universe. Gravity reveals a cosmos overwhelmingly made of we-know-not-what.",
      zh: "在最大的尺度上，引力是唯一的建筑师。从近乎完美光滑的开端出发，它耐心地把最微弱的密度涟漪，放大成恒星、星系、星系团，以及一张穿行于黑暗之中、由物质织成的浩瀚纤维状网络——宇宙网，存在中最大的结构。但当天文学家为星系称重，数字却怎么也对不上。旋转星系边缘的恒星，绕行得快得离谱；星系团弯折光线，弯得太过强烈。引力质量大约是所有可见恒星与气体总和的五倍——那是看不见、摸不着的「暗物质」，它不发光，像幽灵一样穿过普通物质。更离奇的是，宇宙的膨胀正在加速，被一种「暗能量」所驱动——它构成了宇宙的大部分，作用却如同反引力。合起来，我们能看见的一切——每一颗恒星、行星与人——尚不足宇宙的百分之五。引力揭示出一个绝大部分由「我们尚不知是何物」所构成的宇宙。",
    },
  },
  {
    num: "08", id: "emergent",
    title: { en: "Entropy, Information & Emergent Gravity", zh: "熵、信息与涌现引力" },
    sub: { en: "What if gravity is not fundamental, but thermodynamic?", zh: "倘若引力并非基本的，而是热力学的呢？" },
    body: {
      en: "A startling clue surfaced in the 1970s: black holes have entropy, and that entropy is proportional not to their volume but to the area of their horizon. Information about everything that fell in is somehow written on a two-dimensional surface. This 'holographic principle' suggests something radical — that the three-dimensional world may be a kind of projection from information encoded on a distant boundary, and that gravity might be what that information looks like from the inside. On this view, gravity is not a fundamental force at all but an emergent, statistical effect, like temperature or pressure: Jacobson showed Einstein's equations can be derived from thermodynamics; Verlinde argued gravity is an 'entropic force' that arises as systems maximize their disorder. If these ideas are right, then space, time, and gravity all crystallize out of a deeper layer of pure information — and the smooth fabric of spacetime is an illusion woven from countless quantum bits. It is among the most exciting and most speculative frontiers in all of physics.",
      zh: "1970年代浮现出一条令人震惊的线索：黑洞拥有熵，而这熵正比于的，不是它的体积，而是它视界的「面积」。关于一切坠入之物的信息，竟以某种方式书写在一个二维的表面上。这条「全息原理」暗示着某种激进之事——三维世界或许是一种投影，源自编码在遥远边界上的信息，而引力，或许正是那些信息从内部看上去的样子。在这一视角下，引力根本不是一种基本力，而是一种涌现的、统计性的效应，如同温度或压强：雅各布森证明，爱因斯坦方程可以从热力学推导出来；维尔兰德则主张，引力是一种「熵力」，随系统最大化其无序而生。如果这些构想是对的，那么空间、时间与引力，便都是从一个更深的纯信息层中结晶而出——而时空那光滑的织物，不过是由无数量子比特编织出的幻象。这，是整个物理学中最令人兴奋、也最具推测性的前沿之一。",
    },
  },
  {
    num: "09", id: "civilization",
    title: { en: "Civilization & Gravity Technology", zh: "文明与引力技术" },
    sub: { en: "Learning to climb, cheat, and one day sculpt the well", zh: "学会攀爬、欺骗，并终有一日去雕塑引力阱" },
    body: {
      en: "Every rocket launch is a wager against gravity. To leave Earth, a craft must reach escape velocity — about eleven kilometers per second — and almost all of a rocket's mass is fuel burned simply to climb out of the planet's gravity well. Yet humanity has learned not only to fight gravity but to use it: spacecraft steal momentum from planets in 'gravitational slingshots,' flinging probes to the outer solar system for free; satellites are held in orbit by the very pull they seem to defy; GPS would fail within minutes if it did not correct for the relativistic slowing of time at altitude. Astronauts float not because gravity is absent but because they are in perpetual free fall. Looking forward, the dreams grow bolder: artificial gravity from spinning habitats, gravitational-wave astronomy as a new window on the cosmos, and — at the speculative edge — warp drives and wormholes that would sculpt spacetime itself. A civilization's maturity may be measured by how freely it moves through the gravity wells of the universe.",
      zh: "每一次火箭发射，都是一场与引力的对赌。要离开地球，飞行器必须达到逃逸速度——约每秒十一公里——而火箭几乎全部的质量都是燃料，烧掉它们，只为爬出这颗行星的引力阱。然而人类学会的，不只是对抗引力，还有利用它：航天器在「引力弹弓」中从行星窃取动量，免费地把探测器抛向外太阳系；卫星被它们看似违抗的那股拉力维系在轨道上；GPS若不修正高空处时间的相对论性变慢，几分钟内就会失灵。宇航员漂浮，并非因为引力不存在，而是因为他们处在永恒的自由落体之中。向前展望，梦想愈发大胆：来自旋转栖息地的人造重力、作为观测宇宙新窗口的引力波天文学，以及——在最具推测性的边缘——会去雕塑时空本身的曲速引擎与虫洞。一个文明的成熟度，或许可以用它在宇宙的引力阱之间，能多么自由地穿行来度量。",
    },
  },
  {
    num: "10", id: "future",
    title: { en: "The Future of Gravity Theory", zh: "引力理论的未来" },
    sub: { en: "Is gravity fundamental — or does it emerge?", zh: "引力是基本的——还是涌现的？" },
    body: {
      en: "We end where physics itself is unfinished. The grandest unsolved question is whether gravity is one of the bedrock ingredients of reality, like the other forces, or whether it is something that emerges from a deeper layer — from quantum entanglement, from information, from a structure that is not yet spacetime at all. The most tantalizing recent idea is that the connectivity of space itself is woven from entanglement: 'spacetime is built from qubits,' and a smooth, connected universe is simply what richly entangled quantum information feels like from within. If true, then to understand gravity is to understand how space, time, and perhaps even the arrow of causality assemble themselves out of something more primitive. Some go further still, asking whether the same principles that knit spacetime together also underlie minds and observation — whether reality, information, and gravity are three faces of one thing. We do not know. But the trajectory is clear: each revolution has revealed gravity to be deeper, stranger, and more fundamental to the architecture of reality than the last.",
      zh: "我们终结于物理学自身尚未完成之处。最宏大的未解之问是：引力，究竟是现实的基石成分之一，如同其他几种力那样；还是某种从更深层涌现而出之物——从量子纠缠中，从信息中，从一个尚且根本不是「时空」的结构中。近来最诱人的构想是，空间本身的连通性，是由纠缠编织而成的：「时空由量子比特构成」，而一个光滑、连通的宇宙，不过是丰富纠缠着的量子信息从内部感受到的样子。若果真如此，那么理解引力，就是去理解空间、时间、乃至因果之箭，如何从某种更原始之物中自我组装。有人走得更远，追问：那把时空编织在一起的同一套原理，是否也支撑着心智与观测——现实、信息与引力，是否是同一样东西的三张面孔。我们尚不知道。但轨迹是清晰的：每一次革命都揭示出，引力比上一次所知更深、更奇异，也对现实的架构更为根本。",
    },
  },
];

/* ============================================================
   SECTION 1 — UNDERSTANDING-OF-GRAVITY TIMELINE
   ============================================================ */
export type Epoch = { key: string; era: Bi; who: Bi; name: Bi; gain: Bi; accent: string };
export const EPOCHS: Epoch[] = [
  { key: "ancient", era: { en: "Antiquity", zh: "上古" }, who: { en: "Aristotle", zh: "亚里士多德" }, name: { en: "Natural place", zh: "自然位置" }, gain: { en: "Heavy bodies 'seek the center'; heavier things fall faster; heaven and earth obey different laws.", zh: "重物「寻求中心」；越重落得越快；天与地遵循不同的法则。" }, accent: "#8d96ba" },
  { key: "galileo", era: { en: "1590s–1610s", zh: "1590–1610年代" }, who: { en: "Galileo", zh: "伽利略" }, name: { en: "Equal fall", zh: "等速坠落" }, gain: { en: "All objects fall at the same rate regardless of mass; motion can be measured, not just argued.", zh: "一切物体无论质量都以相同速率下落；运动可以被测量，而不只是被辩论。" }, accent: "#9db4ff" },
  { key: "kepler", era: { en: "1609–1619", zh: "1609–1619年" }, who: { en: "Kepler", zh: "开普勒" }, name: { en: "Elliptical orbits", zh: "椭圆轨道" }, gain: { en: "Planets trace ellipses, sweeping equal areas in equal times — order hidden in the sky's motion.", zh: "行星画出椭圆，在相等时间扫过相等面积——天空运动中隐藏的秩序。" }, accent: "#7d8cff" },
  { key: "newton", era: { en: "1687", zh: "1687年" }, who: { en: "Newton", zh: "牛顿" }, name: { en: "Universal gravitation", zh: "万有引力" }, gain: { en: "One inverse-square law binds apple, Moon and tide. F = G·m₁m₂/r². Heaven and earth, unified.", zh: "一条平方反比定律统辖苹果、月亮与潮汐。F = G·m₁m₂/r²。天与地，归于一统。" }, accent: "#5160f0" },
  { key: "einstein", era: { en: "1915", zh: "1915年" }, who: { en: "Einstein", zh: "爱因斯坦" }, name: { en: "Curved spacetime", zh: "弯曲的时空" }, gain: { en: "Gravity is geometry: mass curves spacetime; matter follows the straightest path. Force vanishes.", zh: "引力即几何：质量弯曲时空，物质沿最直的路径前行。「力」就此消失。" }, accent: "#9db4ff" },
  { key: "tests", era: { en: "1919–1970s", zh: "1919–1970年代" }, who: { en: "Eddington · Pound", zh: "爱丁顿·庞德" }, name: { en: "The tests", zh: "诸般检验" }, gain: { en: "Starlight bends at the Sun; clocks slow in gravity; Mercury's orbit precesses — relativity confirmed.", zh: "星光在太阳旁弯折；钟在引力中变慢；水星轨道进动——相对论得到证实。" }, accent: "#2fe0e6" },
  { key: "bh", era: { en: "1960s–70s", zh: "1960–70年代" }, who: { en: "Wheeler · Hawking", zh: "惠勒·霍金" }, name: { en: "Black holes", zh: "黑洞" }, gain: { en: "Singularities are real; black holes have entropy and glow. Gravity meets the quantum at the horizon.", zh: "奇点是真实的；黑洞拥有熵，并会发光。引力在视界处与量子相遇。" }, accent: "#ffb43d" },
  { key: "cosmo", era: { en: "1929–1998", zh: "1929–1998年" }, who: { en: "Hubble · Perlmutter", zh: "哈勃·珀尔马特" }, name: { en: "An expanding cosmos", zh: "膨胀的宇宙" }, gain: { en: "The universe expands — and the expansion accelerates. Dark matter and dark energy dominate.", zh: "宇宙在膨胀——而且膨胀在加速。暗物质与暗能量主宰一切。" }, accent: "#ffc869" },
  { key: "ligo", era: { en: "2015", zh: "2015年" }, who: { en: "LIGO", zh: "LIGO" }, name: { en: "Gravitational waves", zh: "引力波" }, gain: { en: "Spacetime ripples from colliding black holes are heard on Earth. A new sense opens.", zh: "来自黑洞碰撞的时空涟漪在地球上被听见。一种新的感官，就此开启。" }, accent: "#6cefef" },
  { key: "quantum", era: { en: "Now →", zh: "当下 →" }, who: { en: "the open frontier", zh: "敞开的前沿" }, name: { en: "Quantum & emergent", zh: "量子与涌现" }, gain: { en: "Strings, loops, holography, entanglement: is spacetime itself woven from information?", zh: "弦、圈、全息、纠缠：时空本身，是否由信息编织而成？" }, accent: "#c4d2ff" },
];

/* ============================================================
   SECTION 2 — NEWTONIAN PILLARS  +  ORBIT PRESETS
   ============================================================ */
export type Pillar = { sym: string; name: Bi; formula: string; gloss: Bi; accent: string };
export const NEWTON_PILLARS: Pillar[] = [
  { sym: "F", name: { en: "Universal gravitation", zh: "万有引力" }, formula: "F = G·m₁m₂ / r²", gloss: { en: "Every mass pulls every other; the force fades as the square of the distance.", zh: "每个质量都吸引其他质量；力随距离的平方而衰减。" }, accent: "#7d8cff" },
  { sym: "g", name: { en: "Surface gravity", zh: "表面重力" }, formula: "g = G·M / R²", gloss: { en: "Why everything near Earth falls at 9.8 m/s² — independent of its own mass.", zh: "为何地球附近一切都以 9.8 米/秒² 下落——与其自身质量无关。" }, accent: "#9db4ff" },
  { sym: "T", name: { en: "Kepler's third law", zh: "开普勒第三定律" }, formula: "T² ∝ a³", gloss: { en: "An orbit's period is fixed by its size alone — the music of the spheres, made exact.", zh: "轨道周期仅由其大小决定——天体的音乐，被精确化。" }, accent: "#c4d2ff" },
  { sym: "vₑ", name: { en: "Escape velocity", zh: "逃逸速度" }, formula: "vₑ = √(2GM / r)", gloss: { en: "The speed needed to climb out of a gravity well forever — 11.2 km/s from Earth.", zh: "永远爬出引力阱所需的速度——从地球出发为 11.2 公里/秒。" }, accent: "#ffc869" },
  { sym: "Δ", name: { en: "Tides", zh: "潮汐" }, formula: "a_tide ∝ M / r³", gloss: { en: "Gravity pulls harder on the near side than the far — stretching oceans, moons, and stars.", zh: "引力对近侧的拉扯强于远侧——拉伸着海洋、卫星与恒星。" }, accent: "#ffb43d" },
];

// orbit presets for the interactive OrbitLab — initial speed as a fraction of circular-orbit speed
export type OrbitPreset = { label: Bi; vFrac: number; note: Bi };
export const ORBIT_PRESETS: OrbitPreset[] = [
  { label: { en: "Circular", zh: "圆形" }, vFrac: 1.0, note: { en: "Perfect balance — speed exactly matches the pull.", zh: "完美平衡——速度恰好匹配引力。" } },
  { label: { en: "Elliptical", zh: "椭圆" }, vFrac: 1.22, note: { en: "Too fast for a circle — the orbit stretches into an ellipse.", zh: "对圆形而言太快了——轨道被拉伸成椭圆。" } },
  { label: { en: "Sub-orbital", zh: "亚轨道" }, vFrac: 0.72, note: { en: "Too slow — the path falls back toward the mass.", zh: "太慢了——路径回落向中心质量。" } },
  { label: { en: "Escape", zh: "逃逸" }, vFrac: 1.45, note: { en: "Above escape velocity — the orbit opens and never returns.", zh: "超过逃逸速度——轨道敞开，永不返回。" } },
];

/* ============================================================
   SECTION 3 — GENERAL RELATIVITY CONCEPTS
   ============================================================ */
export type GRConcept = { name: Bi; gloss: Bi; accent: string };
export const GR_CONCEPTS: GRConcept[] = [
  { name: { en: "Equivalence principle", zh: "等效原理" }, gloss: { en: "Free fall feels identical to weightlessness; gravity and acceleration are locally the same thing.", zh: "自由落体的感觉与失重完全相同；引力与加速度在局部是同一回事。" }, accent: "#7d8cff" },
  { name: { en: "Curved spacetime", zh: "弯曲时空" }, gloss: { en: "Mass-energy bends the four-dimensional fabric; what bends is not just space, but time.", zh: "质能弯曲着四维织物；被弯曲的不只是空间，还有时间。" }, accent: "#9db4ff" },
  { name: { en: "Geodesics", zh: "测地线" }, gloss: { en: "Freely-falling bodies trace the straightest possible lines through curved geometry.", zh: "自由下落的物体，沿弯曲几何中最直的可能路线前行。" }, accent: "#c4d2ff" },
  { name: { en: "Gravitational time dilation", zh: "引力时间膨胀" }, gloss: { en: "Clocks run slower deeper in a gravity well — measured between floors of a building.", zh: "在引力阱深处，钟走得更慢——这甚至在一栋楼的不同楼层间就已测得。" }, accent: "#6cefef" },
  { name: { en: "Light bending & lensing", zh: "光弯折与透镜" }, gloss: { en: "Starlight curves past massive bodies; galaxies act as cosmic magnifying lenses.", zh: "星光经过大质量天体时弯曲；星系充当宇宙级的放大镜。" }, accent: "#ffc869" },
  { name: { en: "Frame dragging", zh: "参考系拖曳" }, gloss: { en: "A spinning mass twists spacetime around itself, dragging space into rotation.", zh: "旋转的质量把周围的时空拧动，拽着空间一同旋转。" }, accent: "#ffb43d" },
];

export const FIELD_EQUATION = "Gμν + Λgμν = (8πG / c⁴) Tμν";

/* ============================================================
   SECTION 4 — BLACK HOLE STRUCTURE
   ============================================================ */
export type BHLayer = { key: string; name: Bi; r: Bi; gloss: Bi; accent: string };
export const BH_LAYERS: BHLayer[] = [
  { key: "singularity", name: { en: "Singularity", zh: "奇点" }, r: { en: "r = 0", zh: "r = 0" }, gloss: { en: "Where density and curvature run to infinity and known physics fails.", zh: "密度与曲率奔向无穷、已知物理就此失效之处。" }, accent: "#ffb43d" },
  { key: "horizon", name: { en: "Event horizon", zh: "事件视界" }, r: { en: "r = 2GM/c²", zh: "r = 2GM/c²" }, gloss: { en: "The point of no return — beyond it, not even light can escape.", zh: "不归之点——越过它，连光也无法逃逸。" }, accent: "#f08a00" },
  { key: "photon", name: { en: "Photon sphere", zh: "光子球" }, r: { en: "r = 1.5 r_s", zh: "r = 1.5 r_s" }, gloss: { en: "Where gravity bends light so hard it orbits the hole in a circle.", zh: "引力把光弯折到极致，使其绕黑洞做圆周运行之处。" }, accent: "#ffc869" },
  { key: "isco", name: { en: "Innermost stable orbit", zh: "最内稳定轨道" }, r: { en: "r = 3 r_s", zh: "r = 3 r_s" }, gloss: { en: "The closest matter can stably orbit before spiraling in.", zh: "物质在旋落之前，能够稳定绕行的最近处。" }, accent: "#9db4ff" },
  { key: "disk", name: { en: "Accretion disk", zh: "吸积盘" }, r: { en: "outer", zh: "外层" }, gloss: { en: "In-falling gas heated to millions of degrees, blazing across the spectrum.", zh: "坠入的气体被加热到数百万度，照亮整个光谱。" }, accent: "#ffdc94" },
];

export type BHFact = { metric: Bi; value: Bi; gloss: Bi };
export const BH_FACTS: BHFact[] = [
  { metric: { en: "Time dilation at horizon", zh: "视界处的时间膨胀" }, value: { en: "→ ∞", zh: "→ ∞" }, gloss: { en: "To a distant watcher, an infalling clock freezes and reddens forever.", zh: "对远处的观察者，坠入的钟永远冻结、变红。" } },
  { metric: { en: "Sagittarius A*", zh: "人马座 A*" }, value: { en: "4.3M M☉", zh: "430 万倍太阳质量" }, gloss: { en: "The supermassive black hole at the heart of our galaxy.", zh: "潜伏于我们银河系中心的超大质量黑洞。" } },
  { metric: { en: "Energy efficiency", zh: "能量效率" }, value: { en: "up to 42% mc²", zh: "至高 42% mc²" }, gloss: { en: "Matter falling in releases far more energy per kilogram than fusion.", zh: "坠入的物质，每千克释放的能量远超聚变。" } },
  { metric: { en: "Hawking lifetime", zh: "霍金寿命" }, value: { en: "∝ M³", zh: "∝ M³" }, gloss: { en: "Black holes evaporate — but a stellar one outlasts the present universe vastly.", zh: "黑洞会蒸发——但一个恒星级黑洞的寿命远超当今宇宙的年龄。" } },
];

/* ============================================================
   SECTION 5 — GRAVITATIONAL WAVE EVENTS
   ============================================================ */
export type GWEvent = { id: string; date: Bi; source: Bi; gloss: Bi; accent: string };
export const GW_EVENTS: GWEvent[] = [
  { id: "GW150914", date: { en: "Sep 2015", zh: "2015年9月" }, source: { en: "Black hole merger", zh: "黑洞并合" }, gloss: { en: "The first ever detection: two black holes (36 + 29 M☉) merge a billion light-years away.", zh: "史上首次探测：两个黑洞（36 + 29 倍太阳质量）在十亿光年外并合。" }, accent: "#7d8cff" },
  { id: "GW170817", date: { en: "Aug 2017", zh: "2017年8月" }, source: { en: "Neutron-star merger", zh: "中子星并合" }, gloss: { en: "Seen in waves AND light — the birth of multi-messenger astronomy; forged gold and platinum.", zh: "在引力波与光中同时被观测——多信使天文学的诞生；铸造出黄金与铂。" }, accent: "#2fe0e6" },
  { id: "GW190521", date: { en: "May 2019", zh: "2019年5月" }, source: { en: "Intermediate-mass BH", zh: "中等质量黑洞" }, gloss: { en: "Created an 'impossible' 142-solar-mass black hole in a fraction of a second.", zh: "在一瞬间造出一个「不可能」的 142 倍太阳质量黑洞。" }, accent: "#ffc869" },
  { id: "PTA2023", date: { en: "2023", zh: "2023年" }, source: { en: "Pulsar-timing background", zh: "脉冲星计时背景" }, gloss: { en: "A galaxy-sized detector hears the low hum of supermassive black-hole pairs across the cosmos.", zh: "一个星系大小的探测器，听见遍布宇宙的超大质量黑洞对发出的低沉嗡鸣。" }, accent: "#ffb43d" },
];

export type GWFact = { label: Bi; value: Bi };
export const GW_FACTS: GWFact[] = [
  { label: { en: "Strain on Earth", zh: "地球上的应变" }, value: { en: "ΔL/L ≈ 10⁻²¹", zh: "ΔL/L ≈ 10⁻²¹" } },
  { label: { en: "Stretch felt", zh: "感受到的拉伸" }, value: { en: "< 1/1000 proton width", zh: "< 千分之一质子宽" } },
  { label: { en: "Peak power", zh: "峰值功率" }, value: { en: "> all stars combined", zh: "> 所有恒星之总和" } },
  { label: { en: "Wave speed", zh: "波速" }, value: { en: "exactly c", zh: "恰为 c" } },
];

/* ============================================================
   SECTION 6 — QUANTUM GRAVITY APPROACHES
   ============================================================ */
export type QGApproach = { name: Bi; idea: Bi; status: Bi; accent: string };
export const QG_APPROACHES: QGApproach[] = [
  { name: { en: "The graviton", zh: "引力子" }, idea: { en: "Gravity carried by a massless spin-2 particle, like light carries electromagnetism.", zh: "引力由一种无质量的自旋-2粒子携带，如同光携带电磁力。" }, status: { en: "Conceptual; never detected", zh: "概念性的；从未被探测到" }, accent: "#7d8cff" },
  { name: { en: "String theory", zh: "弦论" }, idea: { en: "Particles are tiny vibrating strings in extra dimensions; gravity emerges automatically.", zh: "粒子是额外维度中微小的振动弦；引力自动地涌现。" }, status: { en: "Mathematically rich; untested", zh: "数学上丰富；未经检验" }, accent: "#9db4ff" },
  { name: { en: "Loop quantum gravity", zh: "圈量子引力" }, idea: { en: "Space itself is woven from indivisible loops — area and volume come in discrete atoms.", zh: "空间本身由不可分割的圈编织而成——面积与体积以离散的「原子」出现。" }, status: { en: "Background-independent; partial", zh: "背景无关；尚不完整" }, accent: "#c4d2ff" },
  { name: { en: "Holographic principle", zh: "全息原理" }, idea: { en: "A volume of space is fully described by information on its boundary; gravity is the projection.", zh: "一片空间体积，由其边界上的信息完整描述；引力，是那投影。" }, status: { en: "Strong support via AdS/CFT", zh: "经 AdS/CFT 获强力支持" }, accent: "#6cefef" },
  { name: { en: "Causal sets / asymptotic safety", zh: "因果集 / 渐近安全" }, idea: { en: "Spacetime is a discrete web of cause-and-effect, or gravity tames its own infinities.", zh: "时空是一张离散的因果之网；或者，引力驯服了自身的无穷。" }, status: { en: "Active alternatives", zh: "活跃的替代方案" }, accent: "#ffc869" },
  { name: { en: "Emergent / entanglement", zh: "涌现 / 纠缠" }, idea: { en: "Spacetime and gravity crystallize from quantum entanglement — 'space is built from qubits.'", zh: "时空与引力，从量子纠缠中结晶而出——「空间由量子比特构成」。" }, status: { en: "Frontier; rapidly developing", zh: "前沿；发展迅猛" }, accent: "#ffb43d" },
];

// the core conflict, side by side
export type Tension = { aspect: Bi; gr: Bi; qm: Bi };
export const QG_TENSIONS: Tension[] = [
  { aspect: { en: "Spacetime", zh: "时空" }, gr: { en: "smooth, curved, continuous", zh: "光滑、弯曲、连续" }, qm: { en: "should fluctuate and foam", zh: "应当涨落、起沫" } },
  { aspect: { en: "Determinism", zh: "决定论" }, gr: { en: "exact, predictable paths", zh: "精确、可预测的路径" }, qm: { en: "probabilities, not certainties", zh: "概率，而非确定" } },
  { aspect: { en: "The vacuum", zh: "真空" }, gr: { en: "empty, inert background", zh: "空无、惰性的背景" }, qm: { en: "seething with virtual energy", zh: "翻腾着虚能量" } },
  { aspect: { en: "Breakdown", zh: "失效之处" }, gr: { en: "singularities (∞ curvature)", zh: "奇点（无穷曲率）" }, qm: { en: "gravity won't renormalize", zh: "引力无法被重整化" } },
];

/* ============================================================
   SECTION 7 — COSMIC STRUCTURE & DARK SECTOR
   ============================================================ */
// the cosmic energy budget
export type Budget = { name: Bi; pct: number; gloss: Bi; accent: string };
export const COSMIC_BUDGET: Budget[] = [
  { name: { en: "Dark energy", zh: "暗能量" }, pct: 68, gloss: { en: "A repulsive pressure accelerating cosmic expansion — nature unknown.", zh: "一种加速宇宙膨胀的排斥性压力——本质未知。" }, accent: "#ffb43d" },
  { name: { en: "Dark matter", zh: "暗物质" }, pct: 27, gloss: { en: "Invisible mass whose gravity holds galaxies together — never directly seen.", zh: "看不见的质量，其引力把星系维系在一起——从未被直接看见。" }, accent: "#7d8cff" },
  { name: { en: "Ordinary matter", zh: "普通物质" }, pct: 5, gloss: { en: "Every star, planet, atom and person — under five percent of the whole.", zh: "每一颗恒星、行星、原子与人——不足整体的百分之五。" }, accent: "#6cefef" },
];

// gravity's structures, ascending in scale
export type StructScale = { name: Bi; size: Bi; gloss: Bi; accent: string };
export const STRUCTURE_SCALES: StructScale[] = [
  { name: { en: "Star system", zh: "恒星系统" }, size: { en: "10¹³ m", zh: "10¹³ 米" }, gloss: { en: "Planets bound to a star by its gravity well.", zh: "行星被恒星的引力阱所束缚。" }, accent: "#ffc869" },
  { name: { en: "Galaxy", zh: "星系" }, size: { en: "10²¹ m", zh: "10²¹ 米" }, gloss: { en: "Hundreds of billions of stars — held together mostly by dark matter.", zh: "数千亿颗恒星——主要靠暗物质维系。" }, accent: "#ffb43d" },
  { name: { en: "Cluster", zh: "星系团" }, size: { en: "10²³ m", zh: "10²³ 米" }, gloss: { en: "Thousands of galaxies in a shared gravitational basin.", zh: "数千个星系，共处一个引力盆地之中。" }, accent: "#9db4ff" },
  { name: { en: "Filament", zh: "纤维" }, size: { en: "10²⁴ m", zh: "10²⁴ 米" }, gloss: { en: "Bridges of matter spanning hundreds of millions of light-years.", zh: "横跨数亿光年的物质之桥。" }, accent: "#7d8cff" },
  { name: { en: "Cosmic web", zh: "宇宙网" }, size: { en: "10²⁵ m", zh: "10²⁵ 米" }, gloss: { en: "The largest structure: galaxies strung along threads around vast voids.", zh: "最大的结构：星系沿丝线串起，环绕着浩瀚的空洞。" }, accent: "#c4d2ff" },
];

// galaxy rotation curve — radius (kpc) vs orbital speed (km/s)
export type RotPoint = { r: number; visible: number; observed: number };
export const ROTATION_CURVE: RotPoint[] = [
  { r: 1, visible: 120, observed: 130 },
  { r: 3, visible: 175, observed: 200 },
  { r: 6, visible: 150, observed: 215 },
  { r: 10, visible: 120, observed: 220 },
  { r: 15, visible: 98, observed: 222 },
  { r: 20, visible: 82, observed: 220 },
  { r: 25, visible: 72, observed: 218 },
  { r: 30, visible: 64, observed: 220 },
];

/* ============================================================
   SECTION 8 — EMERGENT / HOLOGRAPHIC GRAVITY
   ============================================================ */
export type EmergentIdea = { name: Bi; gloss: Bi; accent: string };
export const EMERGENT_IDEAS: EmergentIdea[] = [
  { name: { en: "Black-hole entropy", zh: "黑洞熵" }, gloss: { en: "Bekenstein & Hawking: a black hole's entropy scales with its surface area, not its volume.", zh: "贝肯斯坦与霍金：黑洞的熵随其表面积、而非体积而增长。" }, accent: "#ffb43d" },
  { name: { en: "Holographic principle", zh: "全息原理" }, gloss: { en: "'t Hooft & Susskind: a 3-D region is fully encoded on its 2-D boundary.", zh: "特霍夫特与萨斯坎德：一片三维区域，被完整编码在它的二维边界上。" }, accent: "#ffc869" },
  { name: { en: "AdS/CFT duality", zh: "AdS/CFT 对偶" }, gloss: { en: "Maldacena: a universe with gravity equals a boundary theory with no gravity at all.", zh: "马尔达西那：一个有引力的宇宙，等价于一个根本没有引力的边界理论。" }, accent: "#9db4ff" },
  { name: { en: "Thermodynamic gravity", zh: "热力学引力" }, gloss: { en: "Jacobson: Einstein's equations fall out of thermodynamics — gravity as an equation of state.", zh: "雅各布森：爱因斯坦方程从热力学中自然落出——引力，如同一条状态方程。" }, accent: "#7d8cff" },
  { name: { en: "Entropic force", zh: "熵力" }, gloss: { en: "Verlinde: gravity is not fundamental but a statistical drive toward maximum entropy.", zh: "维尔兰德：引力并非基本的，而是趋向最大熵的统计性驱动力。" }, accent: "#c4d2ff" },
  { name: { en: "ER = EPR · spacetime from qubits", zh: "ER = EPR · 时空源于比特" }, gloss: { en: "Maldacena & Susskind: entanglement may literally be the thread that sews spacetime together.", zh: "马尔达西那与萨斯坎德：纠缠，或许正是把时空缝合在一起的那根线。" }, accent: "#6cefef" },
];

// traditional vs emergent — the comparison
export type EmergentRow = { q: Bi; trad: Bi; emergent: Bi };
export const TRAD_VS_EMERGENT: EmergentRow[] = [
  { q: { en: "What is gravity?", zh: "引力是什么？" }, trad: { en: "A fundamental interaction / curvature", zh: "一种基本相互作用 / 曲率" }, emergent: { en: "A statistical, thermodynamic effect", zh: "一种统计性的热力学效应" } },
  { q: { en: "What is spacetime?", zh: "时空是什么？" }, trad: { en: "The basic stage of reality", zh: "现实的基本舞台" }, emergent: { en: "An approximation of deeper information", zh: "更深层信息的一种近似" } },
  { q: { en: "Where does it come from?", zh: "它从何而来？" }, trad: { en: "Given — written into the laws", zh: "天赋的——写进了定律之中" }, emergent: { en: "Crystallizes from entanglement", zh: "从纠缠中结晶而出" } },
];

/* ============================================================
   SECTION 9 — GRAVITY TECHNOLOGY
   ============================================================ */
export type GravTech = { year: Bi; title: Bi; note: Bi; kind: "theory" | "rocket" | "orbit" | "deep" | "wave" | "future" };
export const GRAV_TECH: GravTech[] = [
  { year: { en: "1687", zh: "1687年" }, title: { en: "Newton's cannonball", zh: "牛顿的炮弹" }, note: { en: "A thought experiment: fire a cannon fast enough and the ball falls forever — an orbit.", zh: "一个思想实验：把炮弹打得足够快，它便永远坠落——这就是轨道。" }, kind: "theory" },
  { year: { en: "1926", zh: "1926年" }, title: { en: "Liquid-fuel rocket", zh: "液体燃料火箭" }, note: { en: "Goddard proves a rocket can beat gravity — the first climb toward escape velocity.", zh: "戈达德证明火箭能够战胜引力——迈向逃逸速度的第一次攀登。" }, kind: "rocket" },
  { year: { en: "1957", zh: "1957年" }, title: { en: "Sputnik · first orbit", zh: "斯普特尼克·首次入轨" }, note: { en: "Humanity places its first object in perpetual free fall around the Earth.", zh: "人类把第一个物体送入绕地球的永恒自由落体之中。" }, kind: "orbit" },
  { year: { en: "1969", zh: "1969年" }, title: { en: "Apollo · escaping Earth", zh: "阿波罗·逃离地球" }, note: { en: "Crewed craft reach escape velocity and ride gravity to another world.", zh: "载人飞船达到逃逸速度，乘着引力抵达另一个世界。" }, kind: "rocket" },
  { year: { en: "1977 →", zh: "1977年 →" }, title: { en: "Gravitational slingshot", zh: "引力弹弓" }, note: { en: "Voyager steals momentum from planets to reach the edge of the solar system for free.", zh: "旅行者号从行星窃取动量，免费抵达太阳系的边缘。" }, kind: "deep" },
  { year: { en: "1978 →", zh: "1978年 →" }, title: { en: "GPS · relativity in your pocket", zh: "GPS·口袋里的相对论" }, note: { en: "Satellite clocks must correct for time running faster at altitude — or navigation fails.", zh: "卫星钟必须修正高空处更快的时间——否则导航会失灵。" }, kind: "orbit" },
  { year: { en: "2015 →", zh: "2015年 →" }, title: { en: "LIGO · a gravity telescope", zh: "LIGO·引力望远镜" }, note: { en: "We build instruments to listen to spacetime itself — astronomy without light.", zh: "我们建造仪器去聆听时空本身——没有光的天文学。" }, kind: "wave" },
  { year: { en: "future", zh: "未来" }, title: { en: "Spinning habitats", zh: "旋转栖息地" }, note: { en: "Artificial gravity from rotation — centrifugal force standing in for a planet's pull.", zh: "来自旋转的人造重力——离心力，替代行星的拉扯。" }, kind: "future" },
];

export type EscapeBody = { body: Bi; kms: number; note: Bi };
export const ESCAPE_LADDER: EscapeBody[] = [
  { body: { en: "Moon", zh: "月球" }, kms: 2.4, note: { en: "A gentle well — easy to leave.", zh: "一个温和的引力阱——很容易离开。" } },
  { body: { en: "Mars", zh: "火星" }, kms: 5.0, note: { en: "Half of Earth's grip.", zh: "地球引力的一半。" } },
  { body: { en: "Earth", zh: "地球" }, kms: 11.2, note: { en: "The well we all must climb.", zh: "我们都必须攀爬的那口阱。" } },
  { body: { en: "Jupiter", zh: "木星" }, kms: 59.5, note: { en: "A giant's deep well.", zh: "一个巨人的深阱。" } },
  { body: { en: "Sun", zh: "太阳" }, kms: 617.5, note: { en: "Steep enough to bind a solar system.", zh: "陡到足以束缚一整个太阳系。" } },
  { body: { en: "Black hole horizon", zh: "黑洞视界" }, kms: 299792, note: { en: "Escape velocity = the speed of light. Nothing leaves.", zh: "逃逸速度 = 光速。无物可逃。" } },
];

export type GravFuture = { name: Bi; horizon: Bi; desc: Bi; accent: string };
export const GRAV_FUTURES: GravFuture[] = [
  { name: { en: "Artificial gravity", zh: "人造重力" }, horizon: { en: "near", zh: "近期" }, desc: { en: "Rotating habitats that press crews to the floor with centrifugal force on long voyages.", zh: "旋转的栖息地，在漫长航程中以离心力把乘员压向地板。" }, accent: "#9db4ff" },
  { name: { en: "Gravitational-wave astronomy", zh: "引力波天文学" }, horizon: { en: "now →", zh: "当下 →" }, desc: { en: "Space-based detectors will map merging black holes across the whole observable universe.", zh: "天基探测器将绘制整个可观测宇宙中并合的黑洞。" }, accent: "#6cefef" },
  { name: { en: "Tractor & tether mechanics", zh: "牵引与系绳力学" }, horizon: { en: "mid", zh: "中期" }, desc: { en: "Using a spacecraft's own gravity to nudge asteroids — planetary defense by attraction.", zh: "用航天器自身的引力轻推小行星——以「吸引」实现行星防御。" }, accent: "#ffc869" },
  { name: { en: "Warp drives", zh: "曲速引擎" }, horizon: { en: "speculative", zh: "推测性" }, desc: { en: "Contracting spacetime ahead and expanding it behind — moving without locally exceeding light.", zh: "在前方收缩、在后方膨胀时空——在不局部超光速的情况下移动。" }, accent: "#ffb43d" },
  { name: { en: "Wormholes", zh: "虫洞" }, horizon: { en: "speculative", zh: "推测性" }, desc: { en: "Tunnels stitching distant regions of spacetime — allowed by the equations, if exotic matter exists.", zh: "缝合时空遥远区域的隧道——若奇异物质存在，方程允许它。" }, accent: "#f08a00" },
  { name: { en: "Spacetime engineering", zh: "时空工程" }, horizon: { en: "far", zh: "远期" }, desc: { en: "A civilization that sculpts the gravity well itself — the ultimate mastery of geometry.", zh: "一个雕塑引力阱本身的文明——对几何的终极掌握。" }, accent: "#c4d2ff" },
];

/* ============================================================
   SECTION 10 — THE FUTURE OF GRAVITY THEORY
   ============================================================ */
export type BigQ = { q: Bi; lens: Bi };
export const BIG_QUESTIONS: BigQ[] = [
  { q: { en: "Is gravity fundamental, or emergent?", zh: "引力是基本的，还是涌现的？" }, lens: { en: "The deepest open question: a bedrock force, or a statistical shadow of something else?", zh: "最深的未解之问：一种基石之力，还是别物的统计性投影？" } },
  { q: { en: "What sits at the center of a black hole?", zh: "黑洞的中心是什么？" }, lens: { en: "The singularity is where relativity self-destructs and quantum gravity must take over.", zh: "奇点，是相对论自我毁灭、量子引力必须接手之处。" } },
  { q: { en: "Where does swallowed information go?", zh: "被吞下的信息去了哪里？" }, lens: { en: "The information paradox: if it is destroyed, quantum mechanics breaks.", zh: "信息悖论：若它被摧毁，量子力学就崩塌了。" } },
  { q: { en: "Is spacetime woven from entanglement?", zh: "时空由纠缠编织而成吗？" }, lens: { en: "ER=EPR: connectivity of space may be entanglement viewed from inside.", zh: "ER=EPR：空间的连通性，或许就是从内部看到的纠缠。" } },
  { q: { en: "What are dark matter and dark energy?", zh: "暗物质与暗能量是什么？" }, lens: { en: "95% of the cosmos is gravitating stuff we cannot identify — or a sign gravity itself is wrong.", zh: "宇宙的 95% 是我们无法辨认的引力之物——或者，是引力本身有误的征兆。" } },
  { q: { en: "Are information, gravity and mind one thing?", zh: "信息、引力与心智是同一物吗？" }, lens: { en: "A speculative unity: the same principles assembling spacetime may underlie observation itself.", zh: "一种推测性的统一：组装时空的同一套原理，或许也支撑着观测本身。" } },
];

// concept-map nodes for the unified-theory map (id, label, group, x%, y%)
export type UnifyNode = { id: string; label: Bi; group: "grav" | "quantum" | "info" | "cosmo"; x: number; y: number };
export const UNIFY_NODES: UnifyNode[] = [
  { id: "gr", label: { en: "General relativity", zh: "广义相对论" }, group: "grav", x: 22, y: 26 },
  { id: "qm", label: { en: "Quantum mechanics", zh: "量子力学" }, group: "quantum", x: 78, y: 24 },
  { id: "string", label: { en: "String theory", zh: "弦论" }, group: "quantum", x: 70, y: 54 },
  { id: "loop", label: { en: "Loop gravity", zh: "圈引力" }, group: "grav", x: 30, y: 58 },
  { id: "holo", label: { en: "Holography", zh: "全息" }, group: "info", x: 50, y: 40 },
  { id: "entangle", label: { en: "Entanglement", zh: "纠缠" }, group: "info", x: 50, y: 72 },
  { id: "thermo", label: { en: "Thermodynamics", zh: "热力学" }, group: "info", x: 26, y: 84 },
  { id: "cosmo", label: { en: "Cosmology", zh: "宇宙学" }, group: "cosmo", x: 74, y: 82 },
];
export const UNIFY_EDGES: [string, string][] = [
  ["gr", "holo"], ["qm", "holo"], ["gr", "loop"], ["qm", "string"],
  ["holo", "entangle"], ["entangle", "thermo"], ["holo", "cosmo"],
  ["string", "holo"], ["loop", "thermo"], ["entangle", "cosmo"], ["gr", "cosmo"],
];

/* ============================================================
   META-MODEL — THE ANATOMY OF GRAVITY
   Gravity Structure = Mass-Energy + Geometry + Information
                     + Entropy + Quantum + Cosmic Curvature
   compared across three theories of gravity
   ============================================================ */
export type Capacity = { sym: string; name: Bi; gloss: Bi; newton: number; relativity: number; frontier: number };
export const CAPACITIES: Capacity[] = [
  { sym: "M", name: { en: "Mass-energy", zh: "质能" }, gloss: { en: "How the theory treats the sources that generate gravity.", zh: "理论如何对待产生引力的源。" }, newton: 60, relativity: 90, frontier: 95 },
  { sym: "G", name: { en: "Spacetime geometry", zh: "时空几何" }, gloss: { en: "Whether gravity is a force, or the curvature of spacetime itself.", zh: "引力是一种力，还是时空本身的曲率。" }, newton: 10, relativity: 98, frontier: 88 },
  { sym: "I", name: { en: "Information density", zh: "信息密度" }, gloss: { en: "How much the theory ties gravity to information and encoding.", zh: "理论把引力与信息、编码绑定到何种程度。" }, newton: 0, relativity: 25, frontier: 96 },
  { sym: "S", name: { en: "Entropy dynamics", zh: "熵动力学" }, gloss: { en: "Whether gravity is linked to thermodynamics and disorder.", zh: "引力是否与热力学、无序相关联。" }, newton: 0, relativity: 40, frontier: 92 },
  { sym: "Q", name: { en: "Quantum structure", zh: "量子结构" }, gloss: { en: "How well it accounts for the quantum, discrete nature of reality.", zh: "它对现实的量子、离散本性解释得多好。" }, newton: 0, relativity: 12, frontier: 90 },
  { sym: "K", name: { en: "Cosmic curvature", zh: "宇宙曲率" }, gloss: { en: "Whether it describes the expanding universe at the largest scales.", zh: "它是否在最大尺度上描述膨胀的宇宙。" }, newton: 20, relativity: 95, frontier: 85 },
];

/* ============================================================
   RECURSIVE GRAVITY ENGINE — one principle, every scale
   (the capstone: attraction / curvature re-expressed layer by layer)
   ============================================================ */
export type RecursionLayer = { k: string; name: Bi; scale: Bi; move: Bi; color: string };
export const RECURSION_LAYERS: RecursionLayer[] = [
  { k: "planck", name: { en: "Quantum spacetime", zh: "量子时空" }, scale: { en: "10⁻³⁵ m · Planck", zh: "10⁻³⁵ 米 · 普朗克" }, move: { en: "At the smallest scale, geometry itself should fluctuate — spacetime as foam, or woven from qubits.", zh: "在最小的尺度上，几何本身就应当涨落——时空如泡沫，或由量子比特编织。" }, color: "#c4d2ff" },
  { k: "mass", name: { en: "Mass & energy", zh: "质量与能量" }, scale: { en: "particles · E = mc²", zh: "粒子 · E = mc²" }, move: { en: "Every concentration of mass-energy becomes a source — the seed that bends the geometry around it.", zh: "每一处质能的集中都成为一个源——弯曲其周围几何的种子。" }, color: "#9db4ff" },
  { k: "well", name: { en: "Curvature & wells", zh: "曲率与引力阱" }, scale: { en: "fields · geodesics", zh: "场 · 测地线" }, move: { en: "Mass dishes spacetime into a well; everything nearby simply rolls along the straightest path.", zh: "质量把时空压成一口阱；附近的一切，只是沿最直的路径滚动。" }, color: "#7d8cff" },
  { k: "orbit", name: { en: "Orbits", zh: "轨道" }, scale: { en: "10⁹–10¹³ m", zh: "10⁹–10¹³ 米" }, move: { en: "Moons, planets and stars fall endlessly around one another — perpetual free fall, balanced by speed.", zh: "卫星、行星与恒星彼此无尽地坠落——永恒的自由落体，被速度所平衡。" }, color: "#5160f0" },
  { k: "star", name: { en: "Stellar collapse", zh: "恒星坍缩" }, scale: { en: "10⁹ m · pressure", zh: "10⁹ 米 · 压力" }, move: { en: "Gravity crushes gas until fusion ignites; when fuel runs out, it crushes the remnant inward again.", zh: "引力把气体压到聚变点燃；燃料耗尽时，它再次把残骸向内压垮。" }, color: "#ffc869" },
  { k: "bh", name: { en: "Black holes", zh: "黑洞" }, scale: { en: "horizon · r_s", zh: "视界 · r_s" }, move: { en: "Curvature wins absolutely — a one-way horizon forms, and information presses onto its surface.", zh: "曲率完全获胜——形成一道单向的视界，信息被压上它的表面。" }, color: "#ffb43d" },
  { k: "galaxy", name: { en: "Galaxies & dark matter", zh: "星系与暗物质" }, scale: { en: "10²¹ m", zh: "10²¹ 米" }, move: { en: "Gravity binds billions of stars — but only with five times more invisible mass than we can see.", zh: "引力束缚着数十亿恒星——但前提是，有五倍于可见物质的隐形质量。" }, color: "#f08a00" },
  { k: "web", name: { en: "Cosmic web", zh: "宇宙网" }, scale: { en: "10²⁵ m", zh: "10²⁵ 米" }, move: { en: "Across the cosmos, gravity weaves matter into filaments and voids — the largest structure of all.", zh: "在整个宇宙中，引力把物质织成纤维与空洞——一切之中最大的结构。" }, color: "#6cefef" },
  { k: "expand", name: { en: "Cosmic expansion", zh: "宇宙膨胀" }, scale: { en: "10²⁶ m · Λ", zh: "10²⁶ 米 · Λ" }, move: { en: "On the grandest scale, a dark energy overpowers gravity, stretching space and accelerating apart.", zh: "在最宏大的尺度上，一种暗能量压倒引力，拉伸空间，加速远离。" }, color: "#2fe0e6" },
  { k: "emerge", name: { en: "Emergent spacetime", zh: "涌现时空" }, scale: { en: "information · holography", zh: "信息 · 全息" }, move: { en: "And perhaps the whole structure is a projection — gravity, the shape information takes from within.", zh: "或许整个结构都是一种投影——引力，是信息从内部所呈现的形状。" }, color: "#a6f7f5" },
];
