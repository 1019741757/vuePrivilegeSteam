const app = {
  state: {
    SteamList: [{
        GameName: "Apex英雄",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/APEXYX.jpg'),
        GameURL: "http://580.steam.taohaobang.com/trade/jiashuqi?ProductID=2044",
        GameId: "G00000122",
        imgList: {
          img1: require('@/assets/images/Minbanner/APEXYX1.jpg'),
          img2: require('@/assets/images/Minbanner/APEXYX2.jpg'),
          img3: require('@/assets/images/Minbanner/APEXYX3.jpg')
        },
        GameIntroduction: "《Apex 英雄（Apex Legends）》是一款最新上线的大逃杀类游戏。游戏中玩家能体验到刺激的星际大逃杀的完美游戏乐趣！其中拥有强大技能的传说级角色将在战场上一起组队合作来在边境上取得名声与财富在这款革命性的大逃杀游戏中残破而纷乱的世界，掌握不断增加的多种传奇、精深的战术小队游戏和大胆的创新。",
        OriginalPrice: "56",
        DiscountPrice: "5",
      },
      {
        GameName: "《侠盗飞车5》",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/XDFC5.jpg'),
        GameURL: "http://580.steam.taohaobang.com/trade/jiashuqi?ProductID=1011&from=580",
        GameId: "G00000103",
        imgList: {
          img1: require('@/assets/images/Minbanner/XDFC51.jpg'),
          img2: require('@/assets/images/Minbanner/XDFC52.jpg'),
          img3: require('@/assets/images/Minbanner/XDFC53.jpg')
        },
        GameIntroduction: "《侠盗飞车手5》（Grand Theft Auto V）,是由Rockstar Games游戏公司出版发现的一款围绕犯罪为主题的开放式动作冒险游戏。洛圣都是一座有着明亮灯光、漫长夜晚和肮脏秘密的城市，其最亮、最长、最脏的一面，尽在 GTA 在线模式：不夜城。",
        OriginalPrice: "189",
        DiscountPrice: "175",
      },
      {
        GameName: "人类一败涂地",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/RL-YBTD.jpg'),
        GameURL: "http://580.steam.taohaobang.com/trade/jiashuqi?ProductID=1009&from=580",
        GameId: "G00000102",
        imgList: {
          img1: require('@/assets/images/Minbanner/RL-YBTD1.jpg'),
          img2: require('@/assets/images/Minbanner/RL-YBTD2.jpg'),
          img3: require('@/assets/images/Minbanner/RL-YBTD3.jpg')
        },
        GameIntroduction: "人类一败涂地（Human: Fall Flat）是一款与众不同的基于物理特性的开放结局解谜探索游戏。游戏发生于若干飘浮在云中的幻境中。你的目标就是用你仅有的智慧和物理原理解开谜题，从这些荒诞梦境中逃出来。",
        OriginalPrice: "48",
        DiscountPrice: "43.2",
      },
      {
        GameName: "求生之路2",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/QSZL2.jpg'),
        GameURL: "http://580.steam.taohaobang.com/trade/jiashuqi?ProductID=2019&from=580",
        GameId: "G00000106",
        imgList: {
          img1: require('@/assets/images/Minbanner/QSZL21.jpg'),
          img2: require('@/assets/images/Minbanner/QSZL22.jpg'),
          img3: require('@/assets/images/Minbanner/QSZL23.jpg')
        },
        GameIntroduction: "求生之路2（Left 4 Dead 2）游戏故事发生的时间和原作几乎同时，将呈现另外四位幸存者在僵尸横行的四个场景中奋力求生的艰辛历程，敌人中也将出现新的僵尸，新的近战武器，新的对战僵尸武器和电锯。",
        OriginalPrice: "70",
        DiscountPrice: "56",
      },
      {
        GameName: "人渣",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/RZ-SCUM.jpg'),
        GameURL: "http://580.steam.taohaobang.com/trade/jiashuqi?ProductID=2028&from=580",
        GameId: "G00000101",
        imgList: {
          img1: require('@/assets/images/Minbanner/RZ-SCUM1.jpg'),
          img2: require('@/assets/images/Minbanner/RZ-SCUM2.jpg'),
          img3: require('@/assets/images/Minbanner/RZ-SCUM3.jpg')
        },
        GameIntroduction: "《人渣 scum》是一款开放世界的求生哟秀，玩家将在荒岛上上演饥饿游戏。本作采用了虚幻4引擎打造，游戏的背景设定类似于电影《死亡飞车》（虽然可能没有车）。",
        OriginalPrice: "70",
        DiscountPrice: "55",
      },
      {
        GameName: "孤岛惊魂",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/GDJH.jpg'),
        GameURL: "http://580.steam.taohaobang.com/trade/jiashuqi?ProductID=1006",
        GameId: "G00000116",
        imgList: {
          img1: require('@/assets/images/Minbanner/GDJH1.jpg'),
          img2: require('@/assets/images/Minbanner/GDJH2.jpg'),
          img3: require('@/assets/images/Minbanner/GDJH3.jpg')
        },
        GameIntroduction: "《孤岛惊魂5(Far Cry 5)》是由育碧制作发行的一款第一人称射击游戏，是人气系列《孤岛惊魂》的最新正统续作。欢迎来到蒙大拿州希望郡，一个充满自由与勇士的土地，同时也是名为“伊甸之门”著名毁灭日邪教的所在地。挺身对抗邪教领袖约瑟夫．席德、他的兄弟与使者，藉此燃起反抗的烽火并解放受陷的人民。",
        OriginalPrice: "283",
        DiscountPrice: "235",
      },

      {
        GameName: "武侠乂",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/WX乂.jpg'),
        GameURL: "http://580.steam.taohaobang.com/trade/jiashuqi?ProductID=2026&from=580",
        GameId: "G00000100",
        imgList: {
          img1: require('@/assets/images/Minbanner/WX乂1.jpg'),
          img2: require('@/assets/images/Minbanner/WX乂2.jpg'),
          img3: require('@/assets/images/Minbanner/WX乂3.jpg')
        },
        GameIntroduction: "《武侠乂》是一款高自由度的动作冒险竞技游戏。游戏中，玩家将扮演一名无名侠客，与同场竞赛中的其他九十九名玩家控制的无名侠客们切磋竞技，游戏中除了传统武学，还有弓射、投掷道具等玩法，玩家可自由选择自己喜欢的方式进行竞技",
        OriginalPrice: "88",
        DiscountPrice: "74",
      },
      {
        GameName: "中国式家长",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/ZGSJZ.jpg'),
        GameURL: "http://www.taohaobang.com/?from=580",
        GameId: "G00000120",
        imgList: {
          img1: require('@/assets/images/Minbanner/ZGSJZ1.jpg'),
          img2: require('@/assets/images/Minbanner/ZGSJZ2.jpg'),
          img3: require('@/assets/images/Minbanner/ZGSJZ3.jpg')
        },
        GameIntroduction: "《中国式家长》是一款由墨鱼玩游戏开发的模拟养成游戏，游戏已经上架steam、wegame， [1]  于2018年9月29日正式发售。《中国式家长》是一款现实主义的模拟游戏，游戏模拟从出生到高考的整段过程，探讨中国孩子与家长之间的关系。",
        OriginalPrice: "",
        DiscountPrice: "",
      },
      {
        GameName: "太吾绘卷",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/TWHJ.jpg'),
        GameURL: "http://www.taohaobang.com/?from=580",
        GameId: "G00000109",
        imgList: {
          img1: require('@/assets/images/Minbanner/TWHJ1.jpg'),
          img2: require('@/assets/images/Minbanner/TWHJ2.jpg'),
          img3: require('@/assets/images/Minbanner/TWHJ3.jpg')
        },
        GameIntroduction: "《太吾绘卷》是ConchShip Games研发的一款以神话和武侠为题材的独立游戏。 玩家将扮演神秘的“太吾氏传人”。在《太吾绘卷》的世界中，将以不同的处世立场——或善、或恶、或中庸——投身于纷繁复杂的江湖之中。",
        OriginalPrice: "",
        DiscountPrice: "",
      },
      {
        GameName: "黎明杀机",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/LMSJ.jpg'),
        GameURL: "http://580.steam.taohaobang.com/trade/jiashuqi?ProductID=2018&from=580",
        GameId: "G00000104",
        imgList: {
          img1: require('@/assets/images/Minbanner/LMSJ1.jpg'),
          img2: require('@/assets/images/Minbanner/LMSJ2.jpg'),
          img3: require('@/assets/images/Minbanner/LMSJ3.jpg')
        },
        GameIntroduction: "《黎明杀机》（Dead by Daylight）是一款多人(4vs1) 的恐怖游戏。游戏由其中一人扮演野蛮杀手，另外四人扮演逃生者。逃生者们将试图从野蛮杀手手中奋力逃脱，从而让自己免去被残忍杀害的危险。于2016年6月14日发行，游戏大小为15.4G。",
        OriginalPrice: "82",
        DiscountPrice: "65",
      },
      {
        GameName: "幽灵行动：荒野",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/YLXD-HY.jpg'),
        GameURL: "http://www.taohaobang.com/?from=580",
        GameId: "G00000118",
        imgList: {
          img1: require('@/assets/images/Minbanner/YLXD-HY1.jpg'),
          img2: require('@/assets/images/Minbanner/YLXD-HY2.jpg'),
          img3: require('@/assets/images/Minbanner/YLXD-HY3.jpg')
        },
        GameIntroduction: "《幽灵行动：荒野》是根据美国军事作家汤姆•克兰西的小说《幽灵行动》改编而成。美国陆军开发了可部署的“全能战士系统”，可让单兵变成终极战斗武力组合计划，并建立了名叫幽灵的小队。游戏中幽灵小队将深入南美，粉碎崛起的玻利维亚毒品王国的罪恶意向。",
        OriginalPrice: "",
        DiscountPrice: "",
      },
      {
        GameName: "饥荒联机版",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/JHLJB.jpg'),
        GameURL: "http://www.taohaobang.com/?from=580",
        GameId: "G00000119",
        imgList: {
          img1: require('@/assets/images/Minbanner/JHLJB1.jpg'),
          img2: require('@/assets/images/Minbanner/JHLJB2.jpg'),
          img3: require('@/assets/images/Minbanner/JHLJB3.jpg')
        },
        GameIntroduction: "饥荒行动Klei Entertainment发售的单机求生冒险游戏《饥荒》得到了玩家们的普遍追捧。而多人模式的传言在2014年就有所涉及。Klei Entertainment的生存类游戏《饥荒》虽说深受玩家追捧，但唯一令人感到遗憾的就是无法支持多人游戏的缺点。",
        OriginalPrice: "",
        DiscountPrice: "",
      },
      {
        GameName: "怪物猎人：世界",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/GWLR-SJ.jpg'),
        GameURL: "http://580.steam.taohaobang.com/trade/jiashuqi?ProductID=2027&from=580",
        GameId: "G00000112",
        imgList: {
          img1: require('@/assets/images/Minbanner/GWLR-SJ1.jpg'),
          img2: require('@/assets/images/Minbanner/GWLR-SJ2.jpg'),
          img3: require('@/assets/images/Minbanner/GWLR-SJ3.jpg')
        },
        GameIntroduction: "《怪物猎人：世界》是由CAPCOM制作发行的一款动作冒险游戏，在全球范围内都享有盛赞，本代怪物猎人发生了诸多进化，玩法与画面都有非常巨大的进步，关于片土地人们知之甚少，所以将这片大陆称为“新世界”。",
        OriginalPrice: "308",
        DiscountPrice: "220",
      },
      {
        GameName: "方舟：生存进化",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/FZ-SCJH.jpg'),
        GameURL: "http://580.steam.taohaobang.com/trade/jiashuqi?ProductID=2015&from=580",
        GameId: "G00000105",
        imgList: {
          img1: require('@/assets/images/Minbanner/FZ-SCJH1.jpg'),
          img2: require('@/assets/images/Minbanner/FZ-SCJH2.jpg'),
          img3: require('@/assets/images/Minbanner/FZ-SCJH3.jpg')
        },
        GameIntroduction: "《方舟：生存进化》是一款由虚幻4引擎打造的多人在线生存竞技网游，在一个超高自由度的开放世界里，可以体验采集、制造、打猎、收获、建造、研究以及驯服恐龙等超多自由内容,还要面对其它生存者的威胁，合作生存还是竞技厮杀，由你决定！",
        OriginalPrice: "199",
        DiscountPrice: "159.2",
      },
      {
        GameName: "侏罗纪公园",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/ZLJGY.jpg'),
        GameURL: "http://www.taohaobang.com/?from=580",
        GameId: "G00000110",
        imgList: {
          img1: require('@/assets/images/Minbanner/ZLJGY1.jpg'),
          img2: require('@/assets/images/Minbanner/ZLJGY2.jpg'),
          img3: require('@/assets/images/Minbanner/ZLJGY3.jpg')
        },
        GameIntroduction: "《侏罗纪公园》是环球影业委以TelltaleGames制作的《侏罗纪公园(Jurassic Park)》同名改编的游戏。这款作品将聚焦故事剧情和人物角色，而非创作成一款单纯的恐龙射击游戏，而且将紧跟斯皮尔伯格执导的原作电影风格进行创作。",
        OriginalPrice: "",
        DiscountPrice: "",
      },

      {
        GameName: "古墓丽影：崛起",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/GMLY-JQ.jpg'),
        GameURL: "http://www.taohaobang.com/?from=580",
        GameId: "G00000111",
        imgList: {
          img1: require('@/assets/images/Minbanner/GMLY-JQ1.jpg'),
          img2: require('@/assets/images/Minbanner/GMLY-JQ2.jpg'),
          img3: require('@/assets/images/Minbanner/GMLY-JQ3.jpg')
        },
        GameIntroduction: "《古墓丽影：崛起》是由CrystalDynamics开发，SquareEnix负责发行的一款单机类动作冒险游戏。20周年纪念版，包括基础游戏和以全新内容为特色的季票。您可以在全新的“血缘”故事中探索克劳馥庄园，并在“劳拉的梦魇”中保护其免受僵尸入侵。",
        OriginalPrice: "",
        DiscountPrice: "",
      },
      {
        GameName: "The Forest",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/The-Forest.jpg'),
        GameURL: "http://www.taohaobang.com/?from=580",
        GameId: "G00000108",
        imgList: {
          img1: require('@/assets/images/Minbanner/The-Forest1.jpg'),
          img2: require('@/assets/images/Minbanner/The-Forest2.jpg'),
          img3: require('@/assets/images/Minbanner/The-Forest3.jpg')
        },
        GameIntroduction: "《The Forest》在steam上的价格为70人民币。玩家要通过制造工具，建造基地，探索洞穴来更好的生存下去，找回自己的儿子，同时本游戏有昼、夜温差，玩家要与恶劣的天气和成群的野人、变异体对抗，生存下去。",
        OriginalPrice: "",
        DiscountPrice: "",
      },
      {
        GameName: "欧洲卡车模拟2",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/OZKCMN2.jpg'),
        GameURL: "http://580.steam.taohaobang.com/trade/jiashuqi?ProductID=2024&from=580",
        GameId: "G00000113",
        imgList: {
          img1: require('@/assets/images/Minbanner/OZKCMN21.jpg'),
          img2: require('@/assets/images/Minbanner/OZKCMN22.jpg'),
          img3: require('@/assets/images/Minbanner/OZKCMN23.jpg')
        },
        GameIntroduction: "《欧洲卡车模拟2》是一款模拟经营类游戏，在游戏中玩家完成了运货任务后，就可以着手经营自己的卡车团队，甚至可以购买自己的车库，组建自己的公司。玩家甚至可以自定义自己的卡车排气效果，穿越超过100个欧洲城市。",
        OriginalPrice: "99",
        DiscountPrice: "69",
      },
      {
        GameName: "绝地求生",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/JDQS.jpg'),
        GameURL: "http://580.steam.taohaobang.com/trade/Index?from=580",
        GameId: "G00000117",
        imgList: {
          img1: require('@/assets/images/Minbanner/JDQS1.jpg'),
          img2: require('@/assets/images/Minbanner/JDQS2.jpg'),
          img3: require('@/assets/images/Minbanner/JDQS3.jpg')
        },
        GameIntroduction: "《绝地求生》(PUBG) 是一款战术竞技型射击类沙盒游戏。 该游戏中，玩家需要在游戏地图上收集各种资源，并在不断缩小的安全区域内对抗其他玩家，让自己生存到最后。",
        OriginalPrice: "133",
        DiscountPrice: "88",
      },
      // {
      //   GameName: "NBA2K18",
      //   GameVip: true,
      //   imgUrl: require('@/assets/images/banner/NBA2K18.jpg'),
      //   GameURL: "http://580.steam.taohaobang.com/trade/jiashuqi?ProductID=2017&from=580",
      //   GameId: "G00000114",
      //   imgList: {
      //     img1: require('@/assets/images/Minbanner/NBA2K181.jpg'),
      //     img2: require('@/assets/images/Minbanner/NBA2K182.jpg'),
      //     img3: require('@/assets/images/Minbanner/NBA2K183.jpg')
      //   },
      //   GameIntroduction: "《NBA2K18》是一款篮球类游戏，这款蝉联16年第一的NBA游戏系列的最新力作《NBA2K18》，在2017年9月19日上线PS、XBOX、NS以及PC平台。",
      //   OriginalPrice: "199",
      //   DiscountPrice: "159.2",
      // },
      {
        GameName: "足球经理2018",
        GameVip: true,
        imgUrl: require('@/assets/images/banner/ZQJL2018.jpg'),
        GameURL: "http://580.steam.taohaobang.com/trade/jiashuqi?ProductID=2020&from=580",
        GameId: "G00000115",
        imgList: {
          img1: require('@/assets/images/Minbanner/ZQJL20181.jpg'),
          img2: require('@/assets/images/Minbanner/ZQJL20182.jpg'),
          img3: require('@/assets/images/Minbanner/ZQJL20183.jpg')
        },
        GameIntroduction: "《FootballManager2018》是SEGA公司推出的一款体育类、模拟经营类游戏。带来前所未有具有深度、情感和操作性的交互式真实体验，让玩家仿佛身临其境眼前的足球世界。",
        OriginalPrice: "199",
        DiscountPrice: "64",
      },

      {
        GameName: "古剑奇谭3",
        GameVip: false,
        imgUrl: require('@/assets/images/banner/GJQT.jpg'),
        GameURL: "http://www.taohaobang.com/?from=580",
        GameId: "G00000125",
        imgList: {
          img1: require('@/assets/images/Minbanner/GJQT1.jpg'),
          img2: require('@/assets/images/Minbanner/GJQT2.jpg'),
          img3: require('@/assets/images/Minbanner/GJQT3.jpg')
        },
        GameIntroduction: "古剑系列在古剑一的时候确立好了世界观，之后经过古剑二、古剑OL的延续和增补，整个世界设定已经变得较为庞大。一代时设计的世界观都还有很多内容并没有完整展现出来。而古剑一、古剑二、古剑OL的年代选取相对接近，所以这一次要去更远的时空看一看，领略不同的风土人情。",
        OriginalPrice: "64",
        DiscountPrice: "",
      },
      {
        GameName: "鬼泣5",
        GameVip: false,
        imgUrl: require('@/assets/images/banner/GQ.jpg'),
        GameURL: "http://gg.steam.taohaobang.com/trade/jiashuqi?ProductID=2045",
        GameId: "G00000127",
        imgList: {
          img1: require('@/assets/images/Minbanner/GQ1.jpg'),
          img2: require('@/assets/images/Minbanner/GQ2.jpg'),
          img3: require('@/assets/images/Minbanner/GQ3.jpg')
        },
        GameIntroduction: "《鬼泣5》是继《鬼泣4》之后的CAPCOM又一新作，其故事内容发生在4代之后的几年，故事发生在一个叫红墓之城的城市，自地狱军团入侵这个世界的事件结束以来，已经过去了数年，现在一场新的恶魔入侵行动已经爆发，人类最后的希望寄托在了三名孤独的恶魔猎人手中。",
        OriginalPrice: "300",
        DiscountPrice: "282.7",
      },
      {
        GameName: "猎天使魔女",
        GameVip: false,
        imgUrl: require('@/assets/images/banner/LTMN.jpg'),
        GameURL: "http://www.taohaobang.com/?from=580",
        GameId: "G00000126",
        imgList: {
          img1: require('@/assets/images/Minbanner/LTMN1.jpg'),
          img2: require('@/assets/images/Minbanner/LTMN2.jpg'),
          img3: require('@/assets/images/Minbanner/LTMN3.jpg')
        },
        GameIntroduction: '《猎天使魔女》(日版名ベヨネッタ，美版名Bayonetta，台港译作"魔兵惊天录")是由白金工作室开发的动作类游戏。该作于2009年底至2010年初间在日本及欧美等地区发行。张扬狂放的主角神情与爽快感十足的打斗，处处充满了浓厚《鬼泣》系列的味道，而游戏画面也呈现华丽的哥特式风格;充满强烈的视觉刺激与流畅的动作快感。',
        OriginalPrice: "22",
        DiscountPrice: "22",
      },
      {
        GameName: "生化危机2",
        GameVip: false,
        imgUrl: require('@/assets/images/banner/SHWJ.jpg'),
        GameURL: "http://www.taohaobang.com/?from=580",
        GameId: "G00000128",
        imgList: {
          img1: require('@/assets/images/Minbanner/SHWJ1.jpg'),
          img2: require('@/assets/images/Minbanner/SHWJ2.jpg'),
          img3: require('@/assets/images/Minbanner/SHWJ3.jpg')
        },
        GameIntroduction: '编程高手Rod Lima日前公布了第二段他制作的用《生化危机4》方式进行的自创《生化危机2:重制版》，在第二段视频中他加入了大量的光影效果。一切都凌驾于玩家的想像之上。 一场生化灾难於1998年9月袭击了浣熊市，从残害幸存者的丧尸地狱中生还吧。无尽的刺激、引人入胜的故事和无法想像的恐怖正在等候你。',
        OriginalPrice: "292",
        DiscountPrice: "282.7",
      },
      {
        GameName: "雨中冒险2",
        GameVip: false,
        imgUrl: require('@/assets/images/banner/YZMX.jpg'),
        GameURL: "http://www.taohaobang.com/?from=580",
        GameId: "G00000123",
        imgList: {
          img1: require('@/assets/images/Minbanner/YZMX1.jpg'),
          img2: require('@/assets/images/Minbanner/YZMX2.jpg'),
          img3: require('@/assets/images/Minbanner/YZMX3.jpg')
        },
        GameIntroduction: '经典的地牢探索类多人游戏《雨中冒险》以3D版的形式展现，可以进行单人游戏，或者与至多四名好友组队，一路过关斩将，与大量的怪物作战，解锁新的战利品，并最终找到一条路逃离这颗星球。',
        OriginalPrice: "60.9",
        DiscountPrice: "60.9",
      },
      {
        GameName: "只狼：影逝二度",
        GameVip: false,
        imgUrl: require('@/assets/images/banner/ZLYSED.jpg'),
        GameURL: "http://gg.steam.taohaobang.com/trade/jiashuqi?ProductID=2053",
        GameId: "G00000124",
        imgList: {
          img1: require('@/assets/images/Minbanner/ZLYSED1.jpg'),
          img2: require('@/assets/images/Minbanner/ZLYSED2.jpg'),
          img3: require('@/assets/images/Minbanner/ZLYSED3.jpg')
        },
        GameIntroduction: '《只狼 影逝二度》（英语：Sekiro: Shadows Die Twice，港台译作“只狼：暗影双死”）是由From Software开发与动视发行，预定于2019年3月22日在Microsoft Windows、PlayStation 4和Xbox One平台上发售的动作冒险游戏。游戏讲述忍者只狼为了向杀害其主人并弃尸而去的武士复仇的故事',
        OriginalPrice: "233",
        DiscountPrice: "233",
      },
      {
        GameName: "全面战争：三国",
        GameVip: false,
        imgUrl: require('@/assets/images/banner/QMZZSG.jpg'),
        GameURL: "http://www.taohaobang.com/steamdetail?ProductCode=M0000002582",
        GameId: "G00000129",
        imgList: {
          img1: require('@/assets/images/Minbanner/QMZZSG1.jpg'),
          img2: require('@/assets/images/Minbanner/QMZZSG2.jpg'),
          img3: require('@/assets/images/Minbanner/QMZZSG3.jpg')
        },
        GameIntroduction: "全面战争：三国中文版是一款基于罗马全面战争引擎的一款优秀的三国题材RTS剧本。游戏场面宏大、画面鲜亮，回合制的战略与即使制的战斗绝对能让你身临其境，仿佛回到三国时代马蹄扬尘、刀光剑影的战场一般。",
        OriginalPrice: "268",
        DiscountPrice: "235",
      },
      // {
      //   GameName: "NBA2K19",
      //   GameVip: false,
      //   imgUrl: require('@/assets/images/banner/NBA2K19.jpg'),
      //   GameURL: "http://www.taohaobang.com/?from=580",
      //   GameId: "G00000131",
      //   imgList: {
      //     img1: require('@/assets/images/Minbanner/NBA2K191.jpg'),
      //     img2: require('@/assets/images/Minbanner/NBA2K192.jpg'),
      //     img3: require('@/assets/images/Minbanner/NBA2K193.jpg')
      //   },
      //   GameIntroduction: "喜欢NBA游戏的朋友，相信很多人都玩过2K Games旗下的系列篮球游戏《NBA 2K》，在2K18推出一年后，该系列又迎来了新作《NBA 2K19》。游戏继承了系列前作的优质内容，加入一些新的元素，并经过各方面细节的改善，拥有更好的画面表现和物理效果，玩家也可以更真实的操控喜欢的球星，去获得一次又一次的比赛胜利。",
      //   OriginalPrice: "",
      //   DiscountPrice: "",
      // },
      {
        GameName: "隐形守护者隐形守护者",
        GameVip: false,
        imgUrl: require('@/assets/images/banner/YXSHZ.jpg'),
        GameURL: "http://www.taohaobang.com/steamdetail/?ProductCode=M0000002027",
        GameId: "G00000135",
        imgList: {
          img1: require('@/assets/images/Minbanner/YXSHZ1.jpg'),
          img2: require('@/assets/images/Minbanner/YXSHZ2.jpg'),
          img3: require('@/assets/images/Minbanner/YXSHZ3.jpg')
        },
        GameIntroduction: "《隐形守护者》长篇真人互动影像作品（橙光授权改编新作），创造属于每个人自己的谍战传奇！总有一种理想，值得我们为之守护……你是否曾经幻想在抗战年代，独自潜伏于多方黑暗势力之中，成为一名隐形守护者，当你置身于两难境地之时，究竟该如何选择？",
        OriginalPrice: "66",
        DiscountPrice: "51",
      },
      {
        GameName: "神界：原罪2",
        GameVip: false,
        imgUrl: require('@/assets/images/banner/SJYZ.jpg'),
        GameURL: "http://www.taohaobang.com/?from=580",
        GameId: "G00000130",
        imgList: {
          img1: require('@/assets/images/Minbanner/SJYZ1.jpg'),
          img2: require('@/assets/images/Minbanner/SJYZ2.jpg'),
          img3: require('@/assets/images/Minbanner/SJYZ3.jpg')
        },
        GameIntroduction: '由Larian Studios开发的RPG游戏《神界:原罪》推出了最新续作--《神界:原罪2》，从这款作品登陆Kickstarter平台开启众筹项目的吸金能力来看，该作品是非常值得期待的。并且这部新作是基于《神界:原罪》和《神界:原罪加强版》开发的，相信《神界:原罪2》会成为一部真·神作。',
        OriginalPrice: "",
        DiscountPrice: "",
      },
      {
        GameName: "骑马与砍杀",
        GameVip: false,
        imgUrl: require('@/assets/images/banner/QMYKS.jpg'),
        GameURL: "http://www.taohaobang.com/?from=580",
        GameId: "G00000132",
        imgList: {
          img1: require('@/assets/images/Minbanner/QMYKS1.jpg'),
          img2: require('@/assets/images/Minbanner/QMYKS2.jpg'),
          img3: require('@/assets/images/Minbanner/QMYKS3.jpg')
        },
        GameIntroduction: '骑马与砍杀，是一个非常真实的游戏。游戏系统包括了动作/战术模式和战略模式。战场是随机生成的3D战斗场景。玩家可以体验到中世纪的日常生活、战术指挥及战略谋划等方面的丰富内容。游戏的自由度非常高，玩家可以做一个安安分分的良民、为国王作战的骑士领主，也可以做个云游四方的商人。',
        OriginalPrice: "",
        DiscountPrice: "",
      },
      {
        GameName: "火影忍者疾风传：究极忍者风暴4",
        GameVip: false,
        imgUrl: require('@/assets/images/banner/HYRZ.jpg'),
        GameURL: "http://www.taohaobang.com/?from=580",
        GameId: "G00000133",
        imgList: {
          img1: require('@/assets/images/Minbanner/HYRZ1.jpg'),
          img2: require('@/assets/images/Minbanner/HYRZ2.jpg'),
          img3: require('@/assets/images/Minbanner/HYRZ3.jpg')
        },
        GameIntroduction: '《火影忍者疾风传：究极忍者风暴4》（NARUTO -ナルト- 疾风伝 ナルティメットストーム 4）是一款由Namco Bandai发行的格斗游戏。该作顺延前作剧情发展，同时，本作最大的特点是混战破坏效果更加真实。除了THE LAST的人物加入之外！本作也加入了七代目鸣人，鸣人之子漩涡博人，佐助之女宇智波沙拉娜！总人数达到165人。',
        OriginalPrice: "",
        DiscountPrice: "",
      },
      {
        GameName: "杀戮尖塔",
        GameVip: false,
        imgUrl: require('@/assets/images/banner/SLJT.jpg'),
        GameURL: "http://www.taohaobang.com/?from=580",
        GameId: "G00000134",
        imgList: {
          img1: require('@/assets/images/Minbanner/SLJT1.jpg'),
          img2: require('@/assets/images/Minbanner/SLJT2.jpg'),
          img3: require('@/assets/images/Minbanner/SLJT3.jpg')
        },
        GameIntroduction: '《杀戮尖塔（Slay the Spire）》是一款结合了卡牌与策略玩法的冒险游戏，选择数百个不同的卡和强大的古代文物，用你自己的方式打造你工艺独特的卡组，通过你自己的战斗方式到达塔的顶端！游戏中有丰富的卡牌系统等待着你来体验，如何组合一个强力的卡组将会是你成功的一半！',
        OriginalPrice: "",
        DiscountPrice: "",
      },
    ],
    NetBarName: '',
    NetBarId: '',
    NetBarVIP: '',
    NetBarActivity: false,
  },

  mutations: {
    SET_NAME: (state, NetBarName) => {
      state.NetBarName = NetBarName
    },
    SET_ID: (state, NetBarId) => {
      state.NetBarId = NetBarId
    },
    SET_VIP: (state, NetBarVIP) => {
      state.NetBarVIP = NetBarVIP
    },
    SET_ACTIVITY: (state, NetBarActivity) => {
      state.NetBarActivity = NetBarActivity
    },
  },


}

export default app
