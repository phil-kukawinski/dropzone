// ── Constants ────────────────────────────────────────────────────────────────

const W = 380;
const H = 520;
const BALL_R = 8;
const PEG_R = 5;
const SLOT_H = 38;
const GRAVITY = 0.35;
const BOUNCE = 0.45;
const FRICTION = 0.98;
const SLOTS = 10;
const SLOT_W = W / SLOTS;
const ROWS = 8;
const BASE_SCORES = [5, 10, 20, 50, 100, 50, 20, 10, 5, 2];
const SLOT_COLS = [
  '#5DCAA5','#1D9E75','#378ADD','#7F77DD','#D4537E',
  '#7F77DD','#378ADD','#1D9E75','#5DCAA5','#B4B2A9',
];
const BONUS_COL = '#EF9F27';

function milestoneFor(r) {
  return Math.round(100 + (r - 1) * 80 + Math.pow(r - 1, 2.1) * 8);
}

// ── Shop catalog ──────────────────────────────────────────────────────────────

const SHOP_ITEMS = [
  { id: 'theme_coral',   label: 'Coral Ball',    cost: 50,  type: 'theme',  ball: '#D4537E', trail: '#F0997B' },
  { id: 'theme_teal',    label: 'Teal Ball',     cost: 50,  type: 'theme',  ball: '#1D9E75', trail: '#5DCAA5' },
  { id: 'theme_amber',   label: 'Amber Ball',    cost: 50,  type: 'theme',  ball: '#EF9F27', trail: '#F5C97A' },
  { id: 'theme_red',     label: 'Red Ball',      cost: 75,  type: 'theme',  ball: '#E24B4A', trail: '#F0997B' },
  { id: 'theme_sky',     label: 'Sky Ball',      cost: 75,  type: 'theme',  ball: '#378ADD', trail: '#8EC8F5' },
  { id: 'theme_gold',    label: 'Gold Ball',     cost: 100, type: 'theme',  ball: '#FFD700', trail: '#FFF0A0' },
  { id: 'trail_fire',    label: 'Fire Trail',    cost: 100, type: 'trail',  value: 'fire'    },
  { id: 'trail_rainbow', label: 'Rainbow Trail', cost: 150, type: 'trail',  value: 'rainbow' },
  { id: 'trail_glow',    label: 'Glow Trail',    cost: 120, type: 'trail',  value: 'glow'    },
  { id: 'fx_glow',       label: 'Glowing Ball',  cost: 100, type: 'ballfx', value: 'glow'    },
  { id: 'fx_pulse',      label: 'Pulsing Ball',  cost: 150, type: 'ballfx', value: 'pulse'   },
  { id: 'board_dark',    label: 'Dark Board',    cost: 150, type: 'board',  value: 'dark'    },
  { id: 'board_neon',    label: 'Neon Board',    cost: 200, type: 'board',  value: 'neon'    },
  { id: 'board_minimal', label: 'Minimal Board', cost: 175, type: 'board',  value: 'minimal' },
];

// ── Achievements ──────────────────────────────────────────────────────────────

const ACHIEVEMENTS = [
  { id:'ach_score_500',      label:'First Blood',      desc:'Score 500 in one game',           cat:'score',   check:s=>s.best>=500,           reward:{id:'trail_gem',      label:'Gem Trail',        type:'trail'  }},
  { id:'ach_score_1k',       label:'Warmed Up',         desc:'Score 1,000 in one game',         cat:'score',   check:s=>s.best>=1000,          reward:{id:'theme_orange',   label:'Orange Ball',      type:'theme'  }},
  { id:'ach_score_5k',       label:'Getting Serious',   desc:'Score 5,000 in one game',         cat:'score',   check:s=>s.best>=5000,          reward:{id:'trail_glitch',   label:'Glitch Trail',     type:'trail'  }},
  { id:'ach_score_10k',      label:'High Roller',       desc:'Score 10,000 in one game',        cat:'score',   check:s=>s.best>=10000,         reward:{id:'theme_chrome',   label:'Chrome Ball',      type:'theme'  }},
  { id:'ach_score_25k',      label:'Baller',            desc:'Score 25,000 in one game',        cat:'score',   check:s=>s.best>=25000,         reward:{id:'board_crimson',  label:'Crimson Board',    type:'board'  }},
  { id:'ach_score_50k',      label:'Big Money',         desc:'Score 50,000 in one game',        cat:'score',   check:s=>s.best>=50000,         reward:{id:'trail_crown',    label:'Crown Trail',      type:'trail'  }},
  { id:'ach_score_100k',     label:'Legend',            desc:'Score 100,000 in one game',       cat:'score',   check:s=>s.best>=100000,        reward:{id:'bundle_legend',  label:'Legend title',     type:'title', title:'Legend'      }},
  { id:'ach_score_250k',     label:'Elite',             desc:'Score 250,000 in one game',       cat:'score',   check:s=>s.best>=250000,        reward:{id:'board_starfield',label:'Starfield Board',  type:'board'  }},
  { id:'ach_score_500k',     label:'Phenom',            desc:'Score 500,000 in one game',       cat:'score',   check:s=>s.best>=500000,        reward:{id:'theme_galaxy',   label:'Galaxy Ball',      type:'theme'  }},
  { id:'ach_score_1m',       label:'Transcendent',      desc:'Score 1,000,000 in one game',     cat:'score',   check:s=>s.best>=1000000,       reward:{id:'trail_phoenix',  label:'Phoenix Trail',    type:'trail'  }},
  { id:'ach_score_2500k',    label:'Otherworldly',      desc:'Score 2,500,000 in one game',     cat:'score',   check:s=>s.best>=2500000,       reward:{id:'board_fire',     label:'Fire Board',       type:'board'  }},
  { id:'ach_score_5m',       label:'God Mode',          desc:'Score 5,000,000 in one game',     cat:'score',   check:s=>s.best>=5000000,       reward:{id:'theme_skull',    label:'Skull Ball',       type:'theme'  }},
  { id:'ach_score_10m',      label:'Mythic',            desc:'Score 10,000,000 in one game',    cat:'score',   check:s=>s.best>=10000000,      reward:{id:'theme_diamond',  label:'Diamond Ball',     type:'theme'  }},
  { id:'ach_score_50m',      label:'The Chosen One',    desc:'Score 50,000,000 in one game',    cat:'score',   check:s=>s.best>=50000000,      reward:{id:'bundle_chosen',  label:'Chosen title',     type:'title', title:'The Chosen One'}},
  { id:'ach_total_1k',       label:'First Steps',       desc:'Earn 1,000 points total',         cat:'total',   check:s=>s.totalScore>=1000,         reward:{id:'rx_first_steps', label:'50 bonus gems',    type:'gems',  gems:50   }},
  { id:'ach_total_10k',      label:'Grinder',           desc:'Earn 10,000 points total',        cat:'total',   check:s=>s.totalScore>=10000,        reward:{id:'rx_grinder',     label:'100 bonus gems',   type:'gems',  gems:100  }},
  { id:'ach_total_50k',      label:'Hustler',           desc:'Earn 50,000 points total',        cat:'total',   check:s=>s.totalScore>=50000,        reward:{id:'rx_hustler',     label:'200 bonus gems',   type:'gems',  gems:200  }},
  { id:'ach_total_100k',     label:'Dedicated',         desc:'Earn 100,000 points total',       cat:'total',   check:s=>s.totalScore>=100000,       reward:{id:'rx_dedicated',   label:'300 bonus gems',   type:'gems',  gems:300  }},
  { id:'ach_total_500k',     label:'Committed',         desc:'Earn 500,000 points total',       cat:'total',   check:s=>s.totalScore>=500000,       reward:{id:'rx_committed',   label:'500 bonus gems',   type:'gems',  gems:500  }},
  { id:'ach_total_1m',       label:'Millionaire',       desc:'Earn 1,000,000 points total',     cat:'total',   check:s=>s.totalScore>=1000000,      reward:{id:'fx_explosion',   label:'Explosion Ball',   type:'ballfx'}},
  { id:'ach_total_5m',       label:'Five Million Club', desc:'Earn 5,000,000 points total',     cat:'total',   check:s=>s.totalScore>=5000000,      reward:{id:'bundle_million', label:'Millionaire title',type:'title', title:'Millionaire' }},
  { id:'ach_total_10m',      label:'Ten Million Club',  desc:'Earn 10,000,000 points total',    cat:'total',   check:s=>s.totalScore>=10000000,     reward:{id:'rx_10m',         label:'2,000 bonus gems', type:'gems',  gems:2000 }},
  { id:'ach_total_50m',      label:'Fifty Million',     desc:'Earn 50,000,000 points total',    cat:'total',   check:s=>s.totalScore>=50000000,     reward:{id:'rx_50m',         label:'5,000 bonus gems', type:'gems',  gems:5000 }},
  { id:'ach_total_100m',     label:'Century Club',      desc:'Earn 100,000,000 points total',   cat:'total',   check:s=>s.totalScore>=100000000,    reward:{id:'rx_100m',        label:'10,000 bonus gems',type:'gems',  gems:10000}},
  { id:'ach_total_500m',     label:'Half Billion',      desc:'Earn 500,000,000 points total',   cat:'total',   check:s=>s.totalScore>=500000000,    reward:{id:'rx_500m',        label:'25,000 bonus gems',type:'gems',  gems:25000}},
  { id:'ach_total_1b',       label:'Billionaire',       desc:'Earn 1,000,000,000 points total', cat:'total',   check:s=>s.totalScore>=1000000000,   reward:{id:'bundle_billion', label:'Billionaire title',type:'title', title:'Billionaire' }},
  { id:'ach_round_5',        label:'Just Getting Started',desc:'Reach round 5',                cat:'round',   check:s=>s.bestRound>=5,         reward:{id:'rx_r5',          label:'25 bonus gems',    type:'gems',  gems:25   }},
  { id:'ach_round_10',       label:'Finding Your Groove', desc:'Reach round 10',               cat:'round',   check:s=>s.bestRound>=10,        reward:{id:'board_white',    label:'White Board',      type:'board'  }},
  { id:'ach_round_15',       label:'Deep Run',            desc:'Reach round 15',               cat:'round',   check:s=>s.bestRound>=15,        reward:{id:'rx_r15',         label:'100 bonus gems',   type:'gems',  gems:100  }},
  { id:'ach_round_25',       label:'Veteran',             desc:'Reach round 25',               cat:'round',   check:s=>s.bestRound>=25,        reward:{id:'rx_r25',         label:'250 bonus gems',   type:'gems',  gems:250  }},
  { id:'ach_round_35',       label:'Marathon',            desc:'Reach round 35',               cat:'round',   check:s=>s.bestRound>=35,        reward:{id:'rx_r35',         label:'500 bonus gems',   type:'gems',  gems:500  }},
  { id:'ach_round_50',       label:'Immortal',            desc:'Reach round 50',               cat:'round',   check:s=>s.bestRound>=50,        reward:{id:'bundle_immortal',label:'Immortal title',   type:'title', title:'Immortal'    }},
  { id:'ach_round_75',       label:'Legendary Run',       desc:'Reach round 75',               cat:'round',   check:s=>s.bestRound>=75,        reward:{id:'rx_r75',         label:'2,000 bonus gems', type:'gems',  gems:2000 }},
  { id:'ach_round_100',      label:'Century Run',         desc:'Reach round 100',              cat:'round',   check:s=>s.bestRound>=100,       reward:{id:'bundle_centuryrun',label:'Century title',  type:'title', title:'Century'     }},
  { id:'ach_round_150',      label:'Unstoppable',         desc:'Reach round 150',              cat:'round',   check:s=>s.bestRound>=150,       reward:{id:'rx_r150',        label:'5,000 bonus gems', type:'gems',  gems:5000 }},
  { id:'ach_round_200',      label:'Eternal',             desc:'Reach round 200',              cat:'round',   check:s=>s.bestRound>=200,       reward:{id:'bundle_eternal', label:'Eternal title',    type:'title', title:'Eternal'     }},
  { id:'ach_round_300',      label:'Beyond Limits',       desc:'Reach round 300',              cat:'round',   check:s=>s.bestRound>=300,       reward:{id:'rx_r300',        label:'15,000 bonus gems',type:'gems',  gems:15000}},
  { id:'ach_round_500',      label:'Infinite',            desc:'Reach round 500',              cat:'round',   check:s=>s.bestRound>=500,       reward:{id:'bundle_infinite',label:'Infinite title',   type:'title', title:'Infinite'    }},
  { id:'ach_multi_3',        label:'Getting Warmed Up',  desc:'Hit x3 multiplier in a game',   cat:'skill',   check:s=>s.hitMulti3>=1,         reward:{id:'rx_m3',          label:'25 bonus gems',    type:'gems',  gems:25   }},
  { id:'ach_multi_5',        label:'On Fire',            desc:'Hit x5 multiplier in a game',   cat:'skill',   check:s=>s.hitMulti5>=1,         reward:{id:'rx_m5',          label:'50 bonus gems',    type:'gems',  gems:50   }},
  { id:'ach_multi_10',       label:'Sharp Shooter',      desc:'Hit x10 multiplier in a game',  cat:'skill',   check:s=>s.hitMaxMulti>=1,       reward:{id:'trail_glitch',   label:'Glitch Trail',     type:'trail'  }},
  { id:'ach_multi_10x3',     label:'Hot Streak',         desc:'Hit x10 three times in one game',cat:'skill',  check:s=>s.maxMultiInGame>=3,    reward:{id:'board_fire',     label:'Fire Board',       type:'board'  }},
  { id:'ach_multi_10x5games',label:'Chaser',             desc:'Hit x10 in 5 separate games',   cat:'skill',   check:s=>s.hitMaxMulti>=5,       reward:{id:'rx_chaser',      label:'200 bonus gems',   type:'gems',  gems:200  }},
  { id:'ach_multi_10x25',    label:'Addicted to Chaos',  desc:'Hit x10 in 25 separate games',  cat:'skill',   check:s=>s.hitMaxMulti>=25,      reward:{id:'bundle_chaos',   label:'Chaos title',      type:'title', title:'Chaos'       }},
  { id:'ach_perfect_1',      label:'Perfectionist',      desc:'Complete a round without death or stuck', cat:'skill', check:s=>s.perfectRounds>=1, reward:{id:'rx_perf1',    label:'50 bonus gems',    type:'gems',  gems:50   }},
  { id:'ach_perfect_5',      label:'Flawless',           desc:'Complete 5 perfect rounds',     cat:'skill',   check:s=>s.perfectRounds>=5,     reward:{id:'rx_perf5',       label:'200 bonus gems',   type:'gems',  gems:200  }},
  { id:'ach_perfect_25',     label:'Untouchable',        desc:'Complete 25 perfect rounds',    cat:'skill',   check:s=>s.perfectRounds>=25,    reward:{id:'bundle_untouchable',label:'Untouchable title',type:'title',title:'Untouchable' }},
  { id:'ach_100slot_5',      label:'Precision',          desc:'Land in the 100-pt slot 5 times in one game', cat:'skill', check:s=>s.hundredSlotInGame>=5, reward:{id:'rx_prec',  label:'100 bonus gems',  type:'gems',  gems:100  }},
  { id:'ach_100slot_10',     label:'Surgeon',            desc:'Land in the 100-pt slot 10 times total', cat:'skill', check:s=>s.hundredSlotHits>=10, reward:{id:'rx_surg',     label:'150 bonus gems',   type:'gems',  gems:150  }},
  { id:'ach_100slot_50',     label:'Sniper',             desc:'Land in the 100-pt slot 50 times total', cat:'skill', check:s=>s.hundredSlotHits>=50, reward:{id:'bundle_sniper',label:'Sniper title',    type:'title', title:'Sniper'      }},
  { id:'ach_pegs_100',       label:'Bounce Master',      desc:'Hit 100 pegs in a single drop', cat:'skill',   check:s=>s.maxPegsInDrop>=100,   reward:{id:'rx_bounce',      label:'100 bonus gems',   type:'gems',  gems:100  }},
  { id:'ach_nodeath_10',     label:'Ghost',              desc:'Go 10 rounds without hitting a death slot', cat:'skill', check:s=>s.maxRoundsNoDeath>=10, reward:{id:'bundle_ghost',label:'Ghost title',   type:'title', title:'Ghost'       }},
  { id:'ach_gem_1',          label:'First Gem',          desc:'Collect your first gem',         cat:'gems',    check:s=>s.totalGems>=1,         reward:{id:'rx_gem1',        label:'10 bonus gems',    type:'gems',  gems:10   }},
  { id:'ach_gem_10',         label:'Gem Finder',         desc:'Collect 10 gems lifetime',       cat:'gems',    check:s=>s.totalGems>=10,        reward:{id:'rx_gem10',       label:'20 bonus gems',    type:'gems',  gems:20   }},
  { id:'ach_gem_100',        label:'Gemstone',           desc:'Collect 100 gems lifetime',      cat:'gems',    check:s=>s.totalGems>=100,       reward:{id:'rx_gem100',      label:'50 bonus gems',    type:'gems',  gems:50   }},
  { id:'ach_gem_500',        label:'Gem Collector',      desc:'Collect 500 gems lifetime',      cat:'gems',    check:s=>s.totalGems>=500,       reward:{id:'theme_diamond',  label:'Diamond Ball',     type:'theme'  }},
  { id:'ach_gem_2500',       label:'Gem Baron',          desc:'Collect 2,500 gems lifetime',    cat:'gems',    check:s=>s.totalGems>=2500,      reward:{id:'rx_gem2500',     label:'500 bonus gems',   type:'gems',  gems:500  }},
  { id:'ach_gem_10k',        label:'Gem Lord',           desc:'Collect 10,000 gems lifetime',   cat:'gems',    check:s=>s.totalGems>=10000,     reward:{id:'bundle_gemlord', label:'Gem Lord title',   type:'title', title:'Gem Lord'    }},
  { id:'ach_gem_50k',        label:'Gem God',            desc:'Collect 50,000 gems lifetime',   cat:'gems',    check:s=>s.totalGems>=50000,     reward:{id:'bundle_gemgod',  label:'Gem God title',    type:'title', title:'Gem God'     }},
  { id:'ach_shop_visit',     label:'Window Shopper',     desc:'Visit the shop',                 cat:'gems',    check:s=>s.shopVisits>=1,        reward:{id:'rx_shopvisit',   label:'15 bonus gems',    type:'gems',  gems:15   }},
  { id:'ach_shop_1',         label:'First Purchase',     desc:'Buy 1 item from the shop',       cat:'gems',    check:s=>s.shopItemsBought>=1,   reward:{id:'rx_shop1',       label:'25 bonus gems',    type:'gems',  gems:25   }},
  { id:'ach_shop_5',         label:'Shopaholic',         desc:'Buy 5 items from the shop',      cat:'gems',    check:s=>s.shopItemsBought>=5,   reward:{id:'rx_shop5',       label:'100 bonus gems',   type:'gems',  gems:100  }},
  { id:'ach_shop_10',        label:'Big Spender',        desc:'Buy 10 items from the shop',     cat:'gems',    check:s=>s.shopItemsBought>=10,  reward:{id:'rx_shop10',      label:'250 bonus gems',   type:'gems',  gems:250  }},
  { id:'ach_shop_all',       label:'Fully Loaded',       desc:'Own every shop item',            cat:'gems',    check:s=>s.shopItemsBought>=SHOP_ITEMS.length, reward:{id:'bundle_loaded',label:'Loaded title',  type:'title', title:'Loaded'      }},
  { id:'ach_token_100',      label:'Token Hoarder',      desc:'Collect 100 tokens lifetime',    cat:'gems',    check:s=>s.totalTokens>=100,     reward:{id:'rx_tok100',      label:'100 bonus gems',   type:'gems',  gems:100  }},
  { id:'ach_token_1k',       label:'Token Master',       desc:'Collect 1,000 tokens lifetime',  cat:'gems',    check:s=>s.totalTokens>=1000,    reward:{id:'bundle_tokmaster',label:'Token Master title',type:'title',title:'Token Master' }},
  { id:'ach_death_first',    label:'Lucky',              desc:'Survive your first death slot',  cat:'death',   check:s=>s.deathsSurvived>=1,    reward:{id:'rx_lucky',       label:'15 bonus gems',    type:'gems',  gems:15   }},
  { id:'ach_death_10',       label:'Death Defier',       desc:'Survive 10 death slots',         cat:'death',   check:s=>s.deathsSurvived>=10,   reward:{id:'theme_skull',    label:'Skull Ball',       type:'theme'  }},
  { id:'ach_death_50',       label:'Hard to Kill',       desc:'Survive 50 death slots',         cat:'death',   check:s=>s.deathsSurvived>=50,   reward:{id:'rx_htk',         label:'300 bonus gems',   type:'gems',  gems:300  }},
  { id:'ach_death_200',      label:'Unkillable',         desc:'Survive 200 death slots',        cat:'death',   check:s=>s.deathsSurvived>=200,  reward:{id:'bundle_unkill',  label:'Unkillable title', type:'title', title:'Unkillable'  }},
  { id:'ach_closecall',      label:'Close Call',         desc:'Survive a death slot with 1 ball left', cat:'death', check:s=>s.closeCallSurvives>=1, reward:{id:'rx_close',    label:'75 bonus gems',    type:'gems',  gems:75   }},
  { id:'ach_shield_10',      label:'Shield Lover',       desc:'Use the shield token 10 times',  cat:'death',   check:s=>s.shieldUsed>=10,       reward:{id:'rx_shield10',    label:'100 bonus gems',   type:'gems',  gems:100  }},
  { id:'ach_shield_50',      label:'Fortress',           desc:'Use the shield token 50 times',  cat:'death',   check:s=>s.shieldUsed>=50,       reward:{id:'bundle_fortress',label:'Fortress title',   type:'title', title:'Fortress'    }},
  { id:'ach_revive_1',       label:'Revived',            desc:'Use the ad revival',             cat:'death',   check:s=>s.adReviveUsed>=1,      reward:{id:'rx_revive',      label:'50 bonus gems',    type:'gems',  gems:50   }},
  { id:'ach_comeback',       label:'Comeback Kid',       desc:'Revive and advance 3 more rounds',cat:'death',  check:s=>s.comebackRounds>=3,    reward:{id:'trail_phoenix',  label:'Phoenix Trail',    type:'trail'  }},
  { id:'ach_phoenix',        label:'Phoenix',            desc:'Revive and reach 5 more rounds', cat:'death',   check:s=>s.phoenixRounds>=5,     reward:{id:'bundle_phoenix', label:'Phoenix title',    type:'title', title:'Phoenix'     }},
  { id:'ach_laststand',      label:'Last Stand',         desc:'Advance a round with exactly 1 ball left', cat:'death', check:s=>s.lastStandWins>=1, reward:{id:'rx_laststand',label:'100 bonus gems',   type:'gems',  gems:100  }},
  { id:'ach_bonussave',      label:'Against All Odds',   desc:'Advance via bonus slot with 0 balls left', cat:'death', check:s=>s.bonusSlotSaves>=1, reward:{id:'bundle_odds', label:'Against All Odds title', type:'title', title:'Against All Odds'}},
  { id:'ach_games_1',        label:'First Timer',        desc:'Play your first game',           cat:'meta',    check:s=>s.gamesPlayed>=1,       reward:{id:'rx_games1',      label:'10 bonus gems',    type:'gems',  gems:10   }},
  { id:'ach_games_10',       label:'Regular',            desc:'Play 10 games',                  cat:'meta',    check:s=>s.gamesPlayed>=10,      reward:{id:'rx_games10',     label:'50 bonus gems',    type:'gems',  gems:50   }},
  { id:'ach_games_50',       label:'Habitual',           desc:'Play 50 games',                  cat:'meta',    check:s=>s.gamesPlayed>=50,      reward:{id:'rx_games50',     label:'150 bonus gems',   type:'gems',  gems:150  }},
  { id:'ach_games_100',      label:'Obsessed',           desc:'Play 100 games',                 cat:'meta',    check:s=>s.gamesPlayed>=100,     reward:{id:'rx_games100',    label:'300 bonus gems',   type:'gems',  gems:300  }},
  { id:'ach_games_500',      label:'Devoted',            desc:'Play 500 games',                 cat:'meta',    check:s=>s.gamesPlayed>=500,     reward:{id:'bundle_devoted', label:'Devoted title',    type:'title', title:'Devoted'     }},
  { id:'ach_games_1k',       label:'Lifer',              desc:'Play 1,000 games',               cat:'meta',    check:s=>s.gamesPlayed>=1000,    reward:{id:'bundle_lifer',   label:'Lifer title',      type:'title', title:'Lifer'       }},
  { id:'ach_daily_1',        label:'Daily Devotee',      desc:'Play the daily challenge',       cat:'meta',    check:s=>s.dailyChallengesPlayed>=1, reward:{id:'rx_daily1',  label:'25 bonus gems',    type:'gems',  gems:25   }},
  { id:'ach_daily_7',        label:'Daily Streak',       desc:'Play the daily challenge 7 times',cat:'meta',   check:s=>s.dailyChallengesPlayed>=7, reward:{id:'rx_daily7',  label:'100 bonus gems',   type:'gems',  gems:100  }},
  { id:'ach_daily_30',       label:'Daily Warrior',      desc:'Play the daily challenge 30 times',cat:'meta',  check:s=>s.dailyChallengesPlayed>=30,reward:{id:'bundle_warrior',label:'Warrior title',  type:'title', title:'Warrior'     }},
  { id:'ach_balls_100',      label:'Ball Dropper',       desc:'Drop 100 balls lifetime',        cat:'meta',    check:s=>s.totalBalls>=100,      reward:{id:'rx_balls100',    label:'25 bonus gems',    type:'gems',  gems:25   }},
  { id:'ach_balls_1k',       label:'Ball Machine',       desc:'Drop 1,000 balls lifetime',      cat:'meta',    check:s=>s.totalBalls>=1000,     reward:{id:'rx_balls1k',     label:'100 bonus gems',   type:'gems',  gems:100  }},
  { id:'ach_balls_10k',      label:'Gravity Enthusiast', desc:'Drop 10,000 balls lifetime',     cat:'meta',    check:s=>s.totalBalls>=10000,    reward:{id:'bundle_gravity', label:'Gravity title',    type:'title', title:'Gravity'     }},
  { id:'ach_magnet_10',      label:'Magnet Fan',         desc:'Collect the magnet token 10 times',cat:'meta',  check:s=>s.magnetCollected>=10,  reward:{id:'rx_mag10',       label:'50 bonus gems',    type:'gems',  gems:50   }},
  { id:'ach_magnet_50',      label:'Attracted',          desc:'Collect the magnet token 50 times',cat:'meta',  check:s=>s.magnetCollected>=50,  reward:{id:'bundle_magnet',  label:'Magnetic title',   type:'title', title:'Magnetic'    }},
  { id:'ach_pegs_game_500',  label:'Bouncy Castle',      desc:'Hit 500 pegs in one game',       cat:'meta',    check:s=>s.maxPegsInGame>=500,   reward:{id:'rx_bouncy',      label:'200 bonus gems',   type:'gems',  gems:200  }},
  { id:'ach_pegs_total_10k', label:'Peg Destroyer',      desc:'Hit 10,000 pegs lifetime',       cat:'meta',    check:s=>s.totalPegsHit>=10000,  reward:{id:'rx_pegdes',      label:'300 bonus gems',   type:'gems',  gems:300  }},
  { id:'ach_nightowl',       label:'Night Owl',          desc:'Play between midnight and 4am',  cat:'meta',    check:s=>s.nightOwlGames>=1,     reward:{id:'bundle_nightowl',label:'Night Owl title',  type:'title', title:'Night Owl'   }},
  { id:'ach_speedrun',       label:'Speed Runner',       desc:'Advance 3 rounds in under 2 minutes', cat:'meta', check:s=>s.speedRuns>=1,       reward:{id:'bundle_speed',   label:'Speed Demon title',type:'title', title:'Speed Demon' }},
  { id:'ach_unlocked_10',    label:'Collector',          desc:'Unlock 10 achievements',         cat:'meta',    check:s=>s.achievementsUnlocked>=10,  reward:{id:'rx_coll',   label:'100 bonus gems',   type:'gems',  gems:100  }},
  { id:'ach_unlocked_50',    label:'Completionist',      desc:'Unlock 50 achievements',         cat:'meta',    check:s=>s.achievementsUnlocked>=50,  reward:{id:'bundle_comp',label:'Completionist title',type:'title',title:'Completionist'}},
];

const EXCLUSIVE_COSMETICS = [
  { id: 'trail_gem',      type: 'trail',  label: 'Gem Trail',       value: 'gem'       },
  { id: 'trail_crown',    type: 'trail',  label: 'Crown Trail',     value: 'crown'     },
  { id: 'trail_glitch',   type: 'trail',  label: 'Glitch Trail',    value: 'glitch'    },
  { id: 'trail_phoenix',  type: 'trail',  label: 'Phoenix Trail',   value: 'phoenix'   },
  { id: 'theme_orange',   type: 'theme',  label: 'Orange Ball',     ball: '#FF6B2B', trail: '#FFB347' },
  { id: 'theme_chrome',   type: 'theme',  label: 'Chrome Ball',     ball: '#C0C0C0', trail: '#E8E8E8' },
  { id: 'theme_galaxy',   type: 'theme',  label: 'Galaxy Ball',     ball: '#6A0DAD', trail: '#B57BFF' },
  { id: 'theme_skull',    type: 'theme',  label: 'Skull Ball',      ball: '#1A1A1A', trail: '#666460' },
  { id: 'theme_diamond',  type: 'theme',  label: 'Diamond Ball',    ball: '#B9F2FF', trail: '#FFFFFF' },
  { id: 'fx_explosion',   type: 'ballfx', label: 'Explosion Ball',  value: 'explosion' },
  { id: 'board_crimson',  type: 'board',  label: 'Crimson Board',   value: 'crimson'   },
  { id: 'board_starfield',type: 'board',  label: 'Starfield Board', value: 'starfield' },
  { id: 'board_white',    type: 'board',  label: 'White Board',     value: 'white'     },
  { id: 'board_fire',     type: 'board',  label: 'Fire Board',      value: 'fire'      },
];

const POWERUP_THRESHOLDS = [
  { id: 'shield', label: 'Shield Token', score: 5000  },
  { id: 'magnet', label: 'Magnet Token', score: 10000 },
  { id: 'path',   label: 'Path Preview', score: 15000 },
];

// ── Seasonal Events ───────────────────────────────────────────────────────────

const SEASONAL_EVENTS = [
  {
    id: 'world_cup', name: 'World Cup', emoji: '⚽',
    start: [6,1], end: [7,15],
    ball: '#FFFFFF', ballAlt: '#1A1A1A', trail: 'grass',
    trailColors: ['#1D9E75','#2ECC71','#27AE60'],
    board: 'rgba(20,80,20,0.99)', pegCol: '#FFFFFF',
    gemEmoji: '🏆', desc: 'Soccer ball, pitch board, trophy gems',
  },
  {
    id: 'fourth_july', name: '4th of July', emoji: '🎆',
    start: [6,28], end: [7,8],
    ball: '#B22234', ballAlt: '#3C3B6E', trail: 'firework',
    trailColors: ['#B22234','#FFFFFF','#3C3B6E'],
    board: 'rgba(8,8,40,0.99)', pegCol: '#FFFFFF',
    gemEmoji: '⭐', desc: 'Patriotic colors, firework trail, star gems',
  },
  {
    id: 'halloween', name: 'Halloween', emoji: '🎃',
    start: [10,15], end: [11,1],
    ball: '#FF6B00', ballAlt: '#1A0A2E', trail: 'ghost',
    trailColors: ['#FF6B00','#9B59B6','#E8E8E4'],
    board: 'rgba(20,6,40,0.99)', pegCol: '#FF6B00',
    gemEmoji: '🎃', desc: 'Jack-o-lantern ball, ghost trail, pumpkin gems',
  },
  {
    id: 'christmas', name: 'Christmas', emoji: '🎄',
    start: [12,15], end: [1,2],
    ball: '#C41E3A', ballAlt: '#1A4A1A', trail: 'snow',
    trailColors: ['#FFFFFF','#C8E6C9','#E3F2FD'],
    board: 'rgba(8,30,8,0.99)', pegCol: '#FFFFFF',
    gemEmoji: '⭐', desc: 'Holiday red ball, snow trail, star gems',
  },
  {
    id: 'new_years', name: "New Year's", emoji: '🥂',
    start: [12,28], end: [1,4],
    ball: '#FFD700', ballAlt: '#C5A028', trail: 'sparkle',
    trailColors: ['#FFD700','#FFF8DC','#FFA500'],
    board: 'rgba(8,8,20,0.99)', pegCol: '#FFD700',
    gemEmoji: '🥂', desc: 'Gold ball, sparkle trail, champagne gems',
  },
  {
    id: 'valentines', name: "Valentine's Day", emoji: '💝',
    start: [2,1], end: [2,15],
    ball: '#FF4D8D', ballAlt: '#C2185B', trail: 'hearts',
    trailColors: ['#FF4D8D','#FF80AB','#F8BBD0'],
    board: 'rgba(40,8,20,0.99)', pegCol: '#FF80AB',
    gemEmoji: '💝', desc: 'Pink ball, heart trail, love gems',
  },
  {
    id: 'st_patricks', name: "St. Patrick's Day", emoji: '🍀',
    start: [3,10], end: [3,18],
    ball: '#00A550', ballAlt: '#007A3D', trail: 'clover',
    trailColors: ['#00A550','#7ED321','#C8F7C5'],
    board: 'rgba(4,30,4,0.99)', pegCol: '#7ED321',
    gemEmoji: '🍀', desc: 'Shamrock green ball, clover trail, lucky gems',
  },
  {
    id: 'super_bowl', name: 'Super Bowl', emoji: '🏈',
    start: [2,1], end: [2,10],
    ball: '#8B4513', ballAlt: '#F5DEB3', trail: 'stadium',
    trailColors: ['#8B4513','#D2691E','#F5DEB3'],
    board: 'rgba(20,20,20,0.99)', pegCol: '#F5DEB3',
    gemEmoji: '🏈', desc: 'Football, stadium board, touchdown gems',
  },
  {
    id: 'march_madness', name: 'March Madness', emoji: '🏀',
    start: [3,15], end: [4,7],
    ball: '#FF6B00', ballAlt: '#1A1A1A', trail: 'hardwood',
    trailColors: ['#FF6B00','#D4530A','#F5A623'],
    board: 'rgba(101,67,33,0.99)', pegCol: '#FFFFFF',
    gemEmoji: '🏀', desc: 'Basketball, hardwood board, hoop gems',
  },
  {
    id: 'easter', name: 'Easter', emoji: '🐣',
    start: [3,25], end: [4,20],
    ball: '#FFB6C1', ballAlt: '#B5EAD7', trail: 'pastel',
    trailColors: ['#FFB6C1','#B5EAD7','#FFDAC1','#C7CEEA'],
    board: 'rgba(240,230,250,0.99)', pegCol: '#DDA0DD',
    gemEmoji: '🐣', desc: 'Pastel egg ball, rainbow trail, chick gems',
  },
  {
    id: 'cinco_mayo', name: 'Cinco de Mayo', emoji: '🌮',
    start: [4,28], end: [5,6],
    ball: '#E63946', ballAlt: '#2D6A4F', trail: 'confetti',
    trailColors: ['#E63946','#F4A261','#2D6A4F'],
    board: 'rgba(30,10,10,0.99)', pegCol: '#F4A261',
    gemEmoji: '🌮', desc: 'Fiesta colors, confetti trail, taco gems',
  },
  {
    id: 'mothers_day', name: "Mother's Day", emoji: '🌸',
    start: [5,1], end: [5,12],
    ball: '#FF85A1', ballAlt: '#FFC2D1', trail: 'petals',
    trailColors: ['#FF85A1','#FFC2D1','#FFD6E0'],
    board: 'rgba(40,10,30,0.99)', pegCol: '#FFC2D1',
    gemEmoji: '🌸', desc: 'Floral pink ball, petal trail, blossom gems',
  },
  {
    id: 'memorial_day', name: 'Memorial Day', emoji: '🎖️',
    start: [5,24], end: [5,27],
    ball: '#B22234', ballAlt: '#3C3B6E', trail: 'stars',
    trailColors: ['#B22234','#FFFFFF','#3C3B6E'],
    board: 'rgba(8,8,30,0.99)', pegCol: '#FFFFFF',
    gemEmoji: '🎖️', desc: 'Stars and stripes, honor gems',
  },
  {
    id: 'fathers_day', name: "Father's Day", emoji: '🏅',
    start: [6,14], end: [6,16],
    ball: '#1A3A5C', ballAlt: '#C5A028', trail: 'classic',
    trailColors: ['#1A3A5C','#2E5F8A','#C5A028'],
    board: 'rgba(10,18,30,0.99)', pegCol: '#C5A028',
    gemEmoji: '🏅', desc: 'Navy and gold, medal gems',
  },
  {
    id: 'pride', name: 'Pride Month', emoji: '🏳️‍🌈',
    start: [6,1], end: [6,30],
    ball: '#FF0018', ballAlt: '#FFA52C', trail: 'rainbow',
    trailColors: ['#FF0018','#FFA52C','#FFFF41','#008018','#0000F9','#86007D'],
    board: 'rgba(10,10,20,0.99)', pegCol: '#FF0018',
    gemEmoji: '🏳️‍🌈', desc: 'Rainbow ball, pride trail, rainbow gems',
  },
  {
    id: 'summer_solstice', name: 'Summer Solstice', emoji: '☀️',
    start: [6,19], end: [6,22],
    ball: '#FFD700', ballAlt: '#FFA500', trail: 'solar',
    trailColors: ['#FFD700','#FFA500','#FF8C00'],
    board: 'rgba(30,20,0,0.99)', pegCol: '#FFD700',
    gemEmoji: '☀️', desc: 'Sun ball, golden board, solar gems',
  },
  {
    id: 'back_to_school', name: 'Back to School', emoji: '📚',
    start: [8,15], end: [9,5],
    ball: '#FFD700', ballAlt: '#1565C0', trail: 'pencil',
    trailColors: ['#FFD700','#FFF176','#FFEE58'],
    board: 'rgba(10,30,60,0.99)', pegCol: '#FFD700',
    gemEmoji: '📚', desc: 'School colors, pencil trail, book gems',
  },
  {
    id: 'labor_day', name: 'Labor Day', emoji: '☀️',
    start: [8,30], end: [9,2],
    ball: '#E63946', ballAlt: '#457B9D', trail: 'summer',
    trailColors: ['#E63946','#FFFFFF','#457B9D'],
    board: 'rgba(10,20,40,0.99)', pegCol: '#FFFFFF',
    gemEmoji: '☀️', desc: 'Summer farewell, patriotic gems',
  },
  {
    id: 'fall_equinox', name: 'Fall Equinox', emoji: '🍂',
    start: [9,20], end: [9,23],
    ball: '#D4530A', ballAlt: '#8B2500', trail: 'leaves',
    trailColors: ['#D4530A','#E67E22','#F39C12'],
    board: 'rgba(25,10,5,0.99)', pegCol: '#E67E22',
    gemEmoji: '🍂', desc: 'Autumn ball, falling leaf trail, harvest gems',
  },
  {
    id: 'oktoberfest', name: 'Oktoberfest', emoji: '🍺',
    start: [9,15], end: [10,6],
    ball: '#C8860A', ballAlt: '#8B5E0A', trail: 'amber',
    trailColors: ['#C8860A','#E6A817','#F5C842'],
    board: 'rgba(30,15,5,0.99)', pegCol: '#E6A817',
    gemEmoji: '🍺', desc: 'Amber ball, warm board, stein gems',
  },
  {
    id: 'diwali', name: 'Diwali', emoji: '🪔',
    start: [10,20], end: [11,3],
    ball: '#FFD700', ballAlt: '#E63946', trail: 'diya',
    trailColors: ['#FFD700','#FF6B00','#E63946'],
    board: 'rgba(20,10,5,0.99)', pegCol: '#FFD700',
    gemEmoji: '🪔', desc: 'Festival of lights, jewel trail, lamp gems',
  },
  {
    id: 'veterans_day', name: 'Veterans Day', emoji: '🎖️',
    start: [11,10], end: [11,12],
    ball: '#4A5240', ballAlt: '#C5A028', trail: 'classic',
    trailColors: ['#4A5240','#6B7A5E','#C5A028'],
    board: 'rgba(15,18,12,0.99)', pegCol: '#C5A028',
    gemEmoji: '🎖️', desc: 'Olive and gold, service gems',
  },
  {
    id: 'thanksgiving', name: 'Thanksgiving', emoji: '🦃',
    start: [11,20], end: [11,28],
    ball: '#C8680A', ballAlt: '#8B2500', trail: 'leaves',
    trailColors: ['#C8680A','#E67E22','#D4A017'],
    board: 'rgba(25,12,5,0.99)', pegCol: '#E67E22',
    gemEmoji: '🦃', desc: 'Harvest ball, autumn trail, turkey gems',
  },
  {
    id: 'black_friday', name: 'Black Friday', emoji: '💰',
    start: [11,29], end: [12,1],
    ball: '#1A1A1A', ballAlt: '#2ECC71', trail: 'gold',
    trailColors: ['#2ECC71','#27AE60','#1A1A1A'],
    board: 'rgba(5,5,5,0.99)', pegCol: '#2ECC71',
    gemEmoji: '💰', desc: 'Blackout ball, money trail, cash gems',
  },
  {
    id: 'hanukkah', name: 'Hanukkah', emoji: '✡️',
    start: [12,10], end: [12,18],
    ball: '#4A90D9', ballAlt: '#FFFFFF', trail: 'stars',
    trailColors: ['#4A90D9','#FFFFFF','#87CEEB'],
    board: 'rgba(8,15,35,0.99)', pegCol: '#FFFFFF',
    gemEmoji: '✡️', desc: 'Blue and white, menorah gems',
  },
  {
    id: 'winter_solstice', name: 'Winter Solstice', emoji: '❄️',
    start: [12,20], end: [12,22],
    ball: '#B3E5FC', ballAlt: '#4FC3F7', trail: 'frost',
    trailColors: ['#B3E5FC','#FFFFFF','#81D4FA'],
    board: 'rgba(5,10,25,0.99)', pegCol: '#B3E5FC',
    gemEmoji: '❄️', desc: 'Ice blue ball, frost trail, snowflake gems',
  },
  {
    id: 'new_years_eve', name: "New Year's Eve", emoji: '🎆',
    start: [12,30], end: [12,31],
    ball: '#FFD700', ballAlt: '#C5A028', trail: 'firework',
    trailColors: ['#FFD700','#FF6B00','#E63946'],
    board: 'rgba(5,5,15,0.99)', pegCol: '#FFD700',
    gemEmoji: '🥂', desc: 'Countdown gold, firework trail, champagne gems',
  },
  {
    id: 'lunar_new_year', name: 'Lunar New Year', emoji: '🧧',
    start: [1,25], end: [2,10],
    ball: '#E63946', ballAlt: '#FFD700', trail: 'dragon',
    trailColors: ['#E63946','#FFD700','#FF6B00'],
    board: 'rgba(30,5,5,0.99)', pegCol: '#FFD700',
    gemEmoji: '🧧', desc: 'Red and gold, dragon trail, lucky gems',
  },
  {
    id: 'groundhog_day', name: 'Groundhog Day', emoji: '🦔',
    start: [2,2], end: [2,2],
    ball: '#8B6914', ballAlt: '#D4A857', trail: 'earth',
    trailColors: ['#8B6914','#A0845C','#D4A857'],
    board: 'rgba(20,12,5,0.99)', pegCol: '#D4A857',
    gemEmoji: '🦔', desc: 'Brown earthy ball, tunnel trail, groundhog gems',
  },
  {
    id: 'mardi_gras', name: 'Mardi Gras', emoji: '🎭',
    start: [2,14], end: [3,5],
    ball: '#6A0DAD', ballAlt: '#FFD700', trail: 'beads',
    trailColors: ['#6A0DAD','#FFD700','#00A550'],
    board: 'rgba(20,5,30,0.99)', pegCol: '#FFD700',
    gemEmoji: '🎭', desc: 'Purple gold green, bead trail, mask gems',
  },
  {
    id: 'womens_day', name: "International Women's Day", emoji: '💜',
    start: [3,7], end: [3,9],
    ball: '#9B59B6', ballAlt: '#FFD700', trail: 'empowerment',
    trailColors: ['#9B59B6','#D7BDE2','#FFD700'],
    board: 'rgba(20,5,30,0.99)', pegCol: '#D7BDE2',
    gemEmoji: '💜', desc: 'Purple and gold, empowerment gems',
  },
  {
    id: 'pi_day', name: 'Pi Day', emoji: '🥧',
    start: [3,14], end: [3,14],
    ball: '#7F77DD', ballAlt: '#5DCAA5', trail: 'math',
    trailColors: ['#7F77DD','#5DCAA5','#378ADD'],
    board: 'rgba(10,10,30,0.99)', pegCol: '#5DCAA5',
    gemEmoji: '🥧', desc: 'Math themed, π trail, pie gems',
  },
  {
    id: 'earth_day', name: 'Earth Day', emoji: '🌍',
    start: [4,20], end: [4,22],
    ball: '#2980B9', ballAlt: '#27AE60', trail: 'nature',
    trailColors: ['#2980B9','#27AE60','#1ABC9C'],
    board: 'rgba(5,20,10,0.99)', pegCol: '#27AE60',
    gemEmoji: '🌍', desc: 'Earth ball, nature trail, globe gems',
  },
  {
    id: 'april_fools', name: "April Fools'", emoji: '🃏',
    start: [4,1], end: [4,1],
    ball: '#FF0018', ballAlt: '#00FF00', trail: 'chaos',
    trailColors: ['#FF0018','#00FF00','#0000FF','#FFD700'],
    board: 'rgba(5,5,5,0.99)', pegCol: '#00FF00',
    gemEmoji: '🃏', desc: 'Chaos ball, glitch trail, joker gems',
  },
  {
    id: 'autism_awareness', name: 'Autism Awareness', emoji: '🧩',
    start: [4,1], end: [4,30],
    ball: '#4A90D9', ballAlt: '#E63946', trail: 'puzzle',
    trailColors: ['#4A90D9','#E63946','#FFD700','#00A550'],
    board: 'rgba(8,15,35,0.99)', pegCol: '#4A90D9',
    gemEmoji: '🧩', desc: 'Puzzle piece colors, awareness gems',
  },
  {
    id: 'mental_health', name: 'Mental Health Month', emoji: '💚',
    start: [5,1], end: [5,31],
    ball: '#27AE60', ballAlt: '#1ABC9C', trail: 'calm',
    trailColors: ['#27AE60','#1ABC9C','#A8E6CF'],
    board: 'rgba(5,20,15,0.99)', pegCol: '#A8E6CF',
    gemEmoji: '💚', desc: 'Soft green, calm trail, heart gems',
  },
  {
    id: 'eid', name: 'Eid', emoji: '☪️',
    start: [4,1], end: [4,10],
    ball: '#00A550', ballAlt: '#C5A028', trail: 'crescent',
    trailColors: ['#00A550','#C5A028','#FFFFFF'],
    board: 'rgba(5,20,10,0.99)', pegCol: '#C5A028',
    gemEmoji: '☪️', desc: 'Crescent and star, celebration gems',
  },
];

function getActiveEvents() {
  const now = new Date();
  const m = now.getMonth()+1, d = now.getDate();
  return SEASONAL_EVENTS.filter(ev => {
    const [sm,sd] = ev.start, [em,ed] = ev.end;
    if (sm <= em) return (m>sm||(m===sm&&d>=sd)) && (m<em||(m===em&&d<=ed));
    // wraps year boundary (e.g. Dec–Jan)
    return (m>sm||(m===sm&&d>=sd)) || (m<em||(m===em&&d<=ed));
  });
}

function getActiveEvent() {
  const evs = getActiveEvents();
  if (!evs.length) return null;
  // prefer most recently started
  return evs[evs.length-1];
}

function loadSeasonalOwned() { return LS.get('dz_seasonal_owned', []); }
function saveSeasonalOwned(a) { LS.set('dz_seasonal_owned', a); }
function loadEquippedSeasonal() { return LS.get('dz_seasonal_equip', null); }
function saveEquippedSeasonal(id) { LS.set('dz_seasonal_equip', id); }

function getEquippedSeasonalEvent() {
  const id = loadEquippedSeasonal();
  if (!id) return null;
  return SEASONAL_EVENTS.find(e=>e.id===id)||null;
}

function getGemEmoji() {
  const ev = getEquippedSeasonalEvent();
  return ev ? ev.gemEmoji : '💎';
}

// ── Audio ─────────────────────────────────────────────────────────────────────

let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTone(freq, type, duration, volume = 0.15, delay = 0) {
  if (!soundEnabled) return;
  try {
    const ac = getAudioCtx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain); gain.connect(ac.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ac.currentTime + delay);
    gain.gain.setValueAtTime(volume, ac.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + delay + duration);
    osc.start(ac.currentTime + delay);
    osc.stop(ac.currentTime + delay + duration);
  } catch {}
}

function playArpeggio(freqs, type, noteDur, volume) {
  freqs.forEach((f, i) => playTone(f, type, noteDur, volume, i * noteDur * 0.8));
}

const SFX = {
  peg:        (pegY) => { const row=Math.round((pegY-60)/50); playTone(880-row*60+Math.random()*30, 'square', 0.04, 0.08); },
  score:      (pts) => playTone(pts >= 100 ? 880 : pts >= 50 ? 660 : 440, 'square', 0.1, 0.12),
  token:      () => playArpeggio([523, 659, 784], 'square', 0.08, 0.12),
  gem:        () => playArpeggio([784, 988, 1175], 'square', 0.07, 0.1),
  death:      () => { playTone(220, 'sawtooth', 0.15, 0.15); playTone(165, 'sawtooth', 0.2, 0.12, 0.1); },
  roundUp: (r) => {
    if (r&&r>=10) playArpeggio([523,659,784,1047,1318], 'square', 0.09, 0.15);
    else if (r&&r>=5) playArpeggio([523,659,784,1047], 'square', 0.1, 0.14);
    else playArpeggio([523,659,784], 'square', 0.1, 0.13);
  },
  launch:     () => playArpeggio([262, 330, 392, 523], 'square', 0.12, 0.1),
  stuck:      () => playTone(180, 'sawtooth', 0.18, 0.12),
  shield:     () => playArpeggio([523, 784, 1047], 'square', 0.09, 0.1),
  multiplier: () => playArpeggio([659, 784], 'square', 0.08, 0.13),
  drop:       () => playTone(330, 'square', 0.06, 0.07),
  achieve:    () => playArpeggio([523, 659, 784, 1047, 1318], 'square', 0.1, 0.15),
};

function haptic(dur = 10) {
  if (!vibrationEnabled) return;
  try { if (navigator.vibrate) navigator.vibrate(dur); } catch {}
}

// ── Seeded RNG ────────────────────────────────────────────────────────────────

function seededRng(seed) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}
function todaySeed() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

// ── Canvas ────────────────────────────────────────────────────────────────────

const gc  = document.getElementById('gc');
const ctx = gc.getContext('2d');
document.getElementById('ac').style.display = 'none';
let aimX = -1;

function resizeCanvas() {
  const scale = Math.min(W, window.innerWidth - 32) / W;
  const dpr = window.devicePixelRatio || 1;
  gc.width  = Math.round(W * scale * dpr);
  gc.height = Math.round(H * scale * dpr);
  gc.style.width  = Math.round(W * scale) + 'px';
  gc.style.height = Math.round(H * scale) + 'px';
  ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0);
  document.getElementById('bars').style.width = Math.round(W * scale) + 'px';
}

function clientToGame(clientX) {
  const r = gc.getBoundingClientRect();
  return (clientX - r.left) / (r.width / W);
}

function dark() { return window.matchMedia('(prefers-color-scheme: dark)').matches; }

// ── Persistence ───────────────────────────────────────────────────────────────

const LS = {
  get: (k, def) => { try { const v = localStorage.getItem(k); return v === null ? def : JSON.parse(v); } catch { return def; } },
  set: (k, v)   => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

function loadStats() {
  return LS.get('dz_stats', {
    gamesPlayed:0, totalScore:0, bestRound:0, totalGems:0, totalBalls:0,
    hitMaxMulti:0, deathsSurvived:0, perfectRounds:0, maxMultiInGame:0, comebackRounds:0,
    hitMulti3:0, hitMulti5:0, hundredSlotHits:0, hundredSlotInGame:0,
    maxPegsInDrop:0, maxPegsInGame:0, totalPegsHit:0,
    shopVisits:0, shopItemsBought:0, totalTokens:0,
    closeCallSurvives:0, shieldUsed:0, adReviveUsed:0,
    phoenixRounds:0, lastStandWins:0, bonusSlotSaves:0,
    dailyChallengesPlayed:0, nightOwlGames:0, speedRuns:0,
    magnetCollected:0, maxRoundsNoDeath:0, achievementsUnlocked:0,
  });
}
function saveStats(s)    { LS.set('dz_stats', s); }
function loadBest()      { return LS.get('dz_best', 0); }
function saveBest(v)     { LS.set('dz_best', v); }
function loadGems()      { return LS.get('dz_gems', 0); }
function saveGems(v)     { LS.set('dz_gems', v); }
function loadOwned()     { return LS.get('dz_owned', []); }
function saveOwned(a)    { LS.set('dz_owned', a); }
function loadEquipped()  { return LS.get('dz_equip', {}); }
function saveEquipped(o) { LS.set('dz_equip', o); }
function loadAchieved()  { return LS.get('dz_achieved', []); }
function saveAchieved(a) { LS.set('dz_achieved', a); }
function loadDailyBest() { return LS.get('dz_daily', {}); }
function saveDailyBest(o){ LS.set('dz_daily', o); }
function loadSoundPref() { return LS.get('dz_sound', true); }
function loadVibePref()  { return LS.get('dz_vibe', true); }
function loadOnboarding(){ return LS.get('dz_onboard', false); }
function loadUsername()  { return LS.get('dz_username', null); }
function saveUsername(v) { LS.set('dz_username', v); }
function loadScores()    { return LS.get('dz_scores', []); }
function saveScores(a)   { LS.set('dz_scores', a); }

// ── Username + scores ─────────────────────────────────────────────────────────

function generateUsername() {
  return 'user' + Math.floor(Math.random()*9000000+1000000);
}

function submitScore(isDaily) {
  if (!username) username = generateUsername();
  const scores = loadScores();
  scores.push({
    name: username,
    score,
    round,
    date: new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),
    isDaily: isDaily||false,
  });
  scores.sort((a,b)=>b.score-a.score);
  saveScores(scores.slice(0,10));
}

// ── Daily reward tiers ────────────────────────────────────────────────────────

const DAILY_TIERS = [
  { pts: 50000, gems: 250, label: 'Legendary' },
  { pts: 15000, gems: 100, label: 'Epic'       },
  { pts: 5000,  gems: 50,  label: 'Great'      },
  { pts: 2000,  gems: 25,  label: 'Good'       },
  { pts: 500,   gems: 10,  label: 'Nice'       },
];

function getDailyTier(s) { return DAILY_TIERS.find(t=>s>=t.pts)||null; }

function claimDailyReward(sc) {
  const key = String(todaySeed());
  const db = loadDailyBest();
  if (db[key]&&db[key].rewardClaimed) return null;
  const tier = getDailyTier(sc);
  if (!tier) return null;
  db[key] = {...(db[key]||{}), rewardClaimed:true};
  saveDailyBest(db);
  gems += tier.gems; saveGems(gems);
  const s = loadStats(); s.totalGems=(s.totalGems||0)+tier.gems; saveStats(s);
  return tier;
}

function dailyRewardAlreadyClaimed() {
  const key = String(todaySeed());
  const db = loadDailyBest();
  return !!(db[key]&&db[key].rewardClaimed);
}

// ── State ─────────────────────────────────────────────────────────────────────

let pegs, balls, particles, popups, obstacles, bonusSlots, deathSlots, tokens;
let score, best, ballsLeft, gameOver, dropping, round, multiplier, pendingBalls;
let shieldActive, pendingRoundAdvance;
let gems, owned, equipped, achieved;
let unlockedPowerups;
let newUnlockMsg, newUnlockTimer;
let newAchievMsg, newAchievTimer, newAchievDesc;
let screen = 'launch';
let shopScroll = 0, achieveScroll = 0;
let pulseT = 0, launchAnimT = 0, starfieldStars = [];
let adUsed = false, adScreen = false, adTimer = 0, homeConfirmPending = false;
let isDailyMode = false, dailyRng = null, dailyResult = null;
let soundEnabled = true, vibrationEnabled = true;
let gameMaxMulti = 0, gameDeathHits = 0, roundPerfect = true;
let adRoundAtRevive = 0, postReviveRounds = 0;
let gamePegsHit = 0, gameHundredSlot = 0;
let gameStartTime = 0, consecutiveRoundsNoDeath = 0;
let currentRoundNoDeath = true;
let tokensThisDrop = 0;
let shakeTimer = 0, shakeX = 0, shakeY = 0;
let onboardingDone = false, onboardingStep = -1, isOnboarding = false;
let roundFlashTimer = 0, roundFlashNum = 0;
let leaderboardTab = 'all';
let usernamePromptActive = false;
let usernameInput = '';
let username = null;
let seasonalPickerOpen = false;

function isOwned(id)    { return owned.includes(id); }
function isAchieved(id) { return achieved.includes(id); }
function hasPowerup(id) { return unlockedPowerups.includes(id); }

function getPlayerTitle() {
  const titles = [
    'Billionaire','The Chosen One','Infinite','Eternal','Beyond Limits',
    'Unstoppable','Century','Immortal','Completionist','Lifer','Devoted',
    'Gem God','Gem Lord','Unkillable','Against All Odds','Phoenix',
    'Fortress','Ghost','Untouchable','Chaos','Sniper','Token Master',
    'Magnetic','Gravity','Warrior','Speed Demon','Night Owl',
    'Loaded','Millionaire','Legend',
  ];
  for (const t of titles) {
    if (achieved.some(id => {
      const a = ACHIEVEMENTS.find(x => x.id === id);
      return a && a.reward && a.reward.title === t;
    })) return t;
  }
  return null;
}

function getAllCosmetics() { return [...SHOP_ITEMS, ...EXCLUSIVE_COSMETICS]; }

function getTheme() {
  const ev = getEquippedSeasonalEvent();
  if (ev) return { ball: ev.ball, trail: ev.ballAlt };
  const all = getAllCosmetics();
  const item = all.find(i => i.id === equipped.theme && i.type === 'theme');
  return item || { ball: '#7F77DD', trail: '#AFA9EC' };
}

function getBoardSkin() {
  const ev = getEquippedSeasonalEvent();
  if (ev) return 'seasonal';
  return equipped.board || 'default';
}

function getTrail() {
  const ev = getEquippedSeasonalEvent();
  if (ev) return 'seasonal';
  if (!equipped.trail) return 'default';
  const all=getAllCosmetics();
  const item=all.find(i=>i.id===equipped.trail&&i.type==='trail');
  return item?item.value:'default';
}
function getBallFx() {
  if (!equipped.ballfx) return 'none';
  const all=getAllCosmetics();
  const item=all.find(i=>i.id===equipped.ballfx&&i.type==='ballfx');
  return item?item.value:'none';
}

// ── Achievement checks ────────────────────────────────────────────────────────

function checkAchievements() {
  const stats = loadStats();
  stats.best = loadBest();
  stats.achievementsUnlocked = achieved.length;
  let newOnes = [];
  for (const ach of ACHIEVEMENTS) {
    if (isAchieved(ach.id)) continue;
    if (ach.check(stats)) {
      achieved.push(ach.id);
      newOnes.push(ach);
      const r = ach.reward;
      if (r.type==='gems') {
        gems+=r.gems; saveGems(gems);
        const s=loadStats(); s.totalGems=(s.totalGems||0)+r.gems; saveStats(s);
      } else if (r.type==='trail'  && r.id && !owned.includes(r.id)) { owned.push(r.id); }
        else if (r.type==='theme'  && r.id && !owned.includes(r.id)) { owned.push(r.id); }
        else if (r.type==='board'  && r.id && !owned.includes(r.id)) { owned.push(r.id); }
        else if (r.type==='ballfx' && r.id && !owned.includes(r.id)) { owned.push(r.id); }
        else if (r.type==='title') { }
        else if (r.type==='bundle') {
          if (r.trail  && !owned.includes(r.trail))  owned.push(r.trail);
          if (r.theme  && !owned.includes(r.theme))  owned.push(r.theme);
          if (r.ballfx && !owned.includes(r.ballfx)) owned.push(r.ballfx);
          if (r.board  && !owned.includes(r.board))  owned.push(r.board);
        }
    }
  }
  if (newOnes.length) {
    saveAchieved(achieved); saveOwned(owned);
    SFX.achieve(); haptic([10,5,10,5,20]);
    newAchievMsg  = '🏆 '+newOnes[0].label+'!';
    newAchievDesc = newOnes[0].desc+(newOnes[0].reward.type==='gems'?' (+'+newOnes[0].reward.gems+' 💎)':'');
    newAchievTimer = 300;
    updateHUD();
  }
}

function checkPowerupUnlocks() {
  for (const pu of POWERUP_THRESHOLDS) {
    if (score>=pu.score && !unlockedPowerups.includes(pu.id)) {
      unlockedPowerups.push(pu.id);
      newUnlockMsg   = pu.label+' unlocked!';
      newUnlockTimer = 180;
      buildTokens();
    }
  }
}

// ── Starfield ─────────────────────────────────────────────────────────────────

function buildStarfield() {
  starfieldStars = [];
  for (let i=0;i<80;i++) {
    starfieldStars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.5+0.3,speed:Math.random()*0.3+0.1,alpha:Math.random()});
  }
}

function drawStarfield() {
  for (const s of starfieldStars) {
    s.y+=s.speed; if (s.y>H) s.y=0;
    ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,255,255,${0.2+s.alpha*0.6})`; ctx.fill();
  }
}

// ── Board ─────────────────────────────────────────────────────────────────────

function rngOrMath() { return dailyRng ? dailyRng() : Math.random(); }

function betweenPegY() {
  return 60 + Math.floor(rngOrMath()*(ROWS-1))*50 + 25;
}

function buildBoard() {
  pegs = [];
  for (let row=0;row<ROWS;row++) {
    const count=10;
    const offset=row%2===0?0:(W/(count-1))/2;
    for (let col=0;col<count;col++) {
      const x=offset+(col/(count-1))*(W-PEG_R*2)+PEG_R;
      if (x>W-PEG_R) continue;
      pegs.push({x,y:60+row*50,r:PEG_R,hit:false,ht:0});
    }
  }
  buildObstacles(); buildBonusSlots(); buildTokens();
}

function buildObstacles() {
  obstacles=[];
  if (round<2) return;
  const count=Math.min(Math.floor((round-1)/2)+1,5);
  for (let i=0;i<count;i++) {
    const w=20+rngOrMath()*30;
    const startX=30+rngOrMath()*(W-60-w);
    obstacles.push({x:startX,y:betweenPegY(),w,h:10,type:'bumper',
      baseX:startX,range:30+rngOrMath()*50,
      speed:(0.008+rngOrMath()*0.012)*(rngOrMath()<0.5?1:-1),
      phase:rngOrMath()*Math.PI*2});
  }
  if (round>=5) {
    const s=Math.min(Math.floor((round-4)/3)+1,3);
    for (let i=0;i<s;i++) {
      obstacles.push({x:60+rngOrMath()*(W-120),y:betweenPegY(),
        w:50,h:8,type:'spinner',angle:0,
        speed:0.02+rngOrMath()*0.02,baseX:0,range:0,phase:0});
    }
  }
}

function buildBonusSlots() {
  const deathCount=round>=6?Math.min(Math.floor((round-4)/4),4):0;
  const all=[0,1,2,3,4,5,6,7,8,9].sort(()=>rngOrMath()-0.5);
  bonusSlots=all.slice(0,1);
  deathSlots=all.slice(1,1+deathCount);
}

function buildTokens() {
  tokens=[];
  const count=Math.min(2+Math.floor(round/3),7);
  const types=['x+1','+ball','gem','gem_multi'];
  if (hasPowerup('shield')) types.push('shield');
  if (hasPowerup('magnet')) types.push('magnet');
  for (let i=0;i<count;i++) {
    tokens.push({x:30+rngOrMath()*(W-60),y:betweenPegY(),r:10,type:types[i%types.length],hit:false});
  }
}

// ── Spawning ──────────────────────────────────────────────────────────────────

function spawnBalls(x) {
  const count=Math.max(1,pendingBalls);
  SFX.drop(); haptic(8);
  const stats=loadStats(); stats.totalBalls+=count; saveStats(stats);
  for (let i=0;i<count;i++) {
    const spread=(i-(count-1)/2)*6;
    balls.push({x:Math.max(BALL_R,Math.min(W-BALL_R,x+spread)),y:8,
      vx:(Math.random()-0.5)*0.3,vy:1.5,r:BALL_R,active:true,trail:[],
      pegsHit:0,stuckTimer:0,lastX:x,lastY:8,magnetTimer:0});
  }
  pendingBalls=1; dropping=true; tokensThisDrop=0;
}

function addParticles(x,y,col,n=6) {
  for (let i=0;i<n;i++) {
    const a=Math.random()*Math.PI*2,s=1+Math.random()*2.5;
    particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,r:2+Math.random()*2,life:1,col});
  }
}
function addPopup(x,y,txt,col) { popups.push({x,y,txt,col:col||'#1D9E75',life:1}); }

// ── Predicted path ────────────────────────────────────────────────────────────

function simulatePath(startX) {
  const pts=[{x:startX,y:8}]; let x=startX,y=8,vx=0,vy=1.5,bounces=0;
  for (let step=0;step<500;step++) {
    vy+=GRAVITY; vx*=FRICTION; x+=vx; y+=vy;
    if (x-BALL_R<0){x=BALL_R;vx=Math.abs(vx);}
    if (x+BALL_R>W){x=W-BALL_R;vx=-Math.abs(vx);}
    for (const p of pegs) {
      const dx=x-p.x,dy=y-p.y,d=Math.hypot(dx,dy);
      if (d<BALL_R+p.r) {
        const nx=dx/d,ny=dy/d,ov=BALL_R+p.r-d;
        x+=nx*ov;y+=ny*ov;
        const dot=vx*nx+vy*ny;
        vx=(vx-2*dot*nx)*BOUNCE; vy=(vy-2*dot*ny)*BOUNCE;
        bounces++; pts.push({x,y}); if (bounces>=7) return pts;
      }
    }
    if (step%5===0) pts.push({x,y});
    if (y+BALL_R>H-SLOT_H){pts.push({x,y});break;}
  }
  return pts;
}

// ── HUD ───────────────────────────────────────────────────────────────────────

function updateHUD() {
  document.getElementById('sv').textContent  = score;
  document.getElementById('bv').textContent  = best;
  document.getElementById('blv').textContent = ballsLeft+(pendingBalls>1?' ('+pendingBalls+'x)':'');
  document.getElementById('mv').textContent  = 'x'+multiplier;
  document.getElementById('rv').textContent  = round;
  const ms=milestoneFor(round), pct=Math.min(1,score/ms);
  const pf=document.getElementById('progress-fill');
  pf.style.width=(pct*100)+'%';
  pf.style.background=pct>=1?'#1D9E75':pct>0.6?'#EF9F27':'#E24B4A';
  document.getElementById('target-label').textContent=score+' / '+ms;
  const sf=document.getElementById('streak-fill');
  sf.style.width=((multiplier-1)/9*100)+'%';
  sf.style.background=multiplier>=5?'#D4537E':multiplier>=2?'#EF9F27':'#7F77DD';
  const sb=document.getElementById('shop-btn');
  if (sb) sb.textContent=isDailyMode?'📅 daily':'💎 '+gems;
}
function setMsg(t) { document.getElementById('msg').textContent=t; }

// ── Game logic ────────────────────────────────────────────────────────────────

function resolveSlot(b) {
  const slot=Math.max(0,Math.min(SLOTS-1,Math.floor(b.x/SLOT_W)));
  const isBonus=bonusSlots.includes(slot), isDeath=deathSlots.includes(slot);

  if (isDeath) {
    SFX.death(); haptic([20,10,20]); triggerShake();
    if (shieldActive) {
      shieldActive=false; SFX.shield(); haptic(15);
      const stats=loadStats(); stats.deathsSurvived++; stats.shieldUsed=(stats.shieldUsed||0)+1;
      if (ballsLeft<=1) stats.closeCallSurvives=(stats.closeCallSurvives||0)+1;
      saveStats(stats);
      addPopup(b.x,H-SLOT_H-22,'🛡 BLOCKED!','#5DCAA5');
      addParticles(b.x,H-SLOT_H,'#5DCAA5',20);
      // Extra particles in white for flash effect
      addParticles(b.x,H-SLOT_H,'#ffffff',8);
    } else {
      ballsLeft=Math.max(0,ballsLeft-1); multiplier=1;
      gameDeathHits++; roundPerfect=false; currentRoundNoDeath=false;
      const ds=loadStats(); ds.deathsSurvived=(ds.deathsSurvived||0)+1;
      if (ballsLeft<=0) ds.closeCallSurvives=(ds.closeCallSurvives||0)+1;
      saveStats(ds);
      addPopup(b.x,H-SLOT_H-22,'-1 ball  x1','#E24B4A');
      addParticles(b.x,H-SLOT_H,'#E24B4A',12);
    }
    updateHUD(); return;
  }

  let pts=BASE_SCORES[slot]*multiplier;
  if (BASE_SCORES[slot]===100) {
    gameHundredSlot++;
    const s=loadStats();
    s.hundredSlotHits=(s.hundredSlotHits||0)+1;
    s.hundredSlotInGame=gameHundredSlot;
    saveStats(s);
  }

  if (isBonus) {
    const hadZeroBalls=ballsLeft<=0;
    ballsLeft++; pts=Math.round(pts*1.5);
    if (hadZeroBalls){const s=loadStats();s.bonusSlotSaves=(s.bonusSlotSaves||0)+1;saveStats(s);}
    addPopup(b.x,H-SLOT_H-22,'+1 ball!',BONUS_COL);
    addParticles(b.x,H-SLOT_H,BONUS_COL,12);
  } else { addParticles(b.x,H-SLOT_H,SLOT_COLS[slot]); }

  SFX.score(pts); haptic(6);
  score+=pts;
  const stats=loadStats(); stats.totalScore+=pts; saveStats(stats);
  addPopup(b.x,H-SLOT_H-10,'+'+pts,isBonus?BONUS_COL:SLOT_COLS[slot]);
  if (score>best){best=score;saveBest(best);}
  checkPowerupUnlocks();
  if (score>=milestoneFor(round)&&!pendingRoundAdvance) pendingRoundAdvance=true;
  updateHUD();
}

function advanceRound() {
  SFX.roundUp(round+1); haptic([10,5,10,5,10]);
  if (ballsLeft===1){const s=loadStats();s.lastStandWins=(s.lastStandWins||0)+1;saveStats(s);}
  if (roundPerfect){const stats=loadStats();stats.perfectRounds=(stats.perfectRounds||0)+1;saveStats(stats);}
  if (currentRoundNoDeath) {
    consecutiveRoundsNoDeath++;
    const s=loadStats();
    if (consecutiveRoundsNoDeath>(s.maxRoundsNoDeath||0)){s.maxRoundsNoDeath=consecutiveRoundsNoDeath;saveStats(s);}
  } else { consecutiveRoundsNoDeath=0; }
  currentRoundNoDeath=true;
  if (adUsed) {
    postReviveRounds++;
    if (postReviveRounds>=3){const s=loadStats();s.comebackRounds=Math.max(s.comebackRounds||0,3);saveStats(s);}
    if (postReviveRounds>=5){const s=loadStats();s.phoenixRounds=Math.max(s.phoenixRounds||0,5);saveStats(s);}
  }
  if (round===3) {
    const elapsed=(Date.now()-gameStartTime)/1000;
    if (elapsed<120){const s=loadStats();s.speedRuns=(s.speedRuns||0)+1;saveStats(s);}
  }
  round++;
  const stats=loadStats(); if (round>stats.bestRound){stats.bestRound=round;saveStats(stats);}
  roundPerfect=true;
  const refill=Math.max(1,3-Math.floor(round/15));
  ballsLeft=Math.min(ballsLeft+refill,8);
  dropping=false; balls=[]; pendingRoundAdvance=false;
  roundFlashTimer=60; roundFlashNum=round;
  buildBoard();
  setMsg('round '+round+'! need '+milestoneFor(round)+' total — click to drop');
  updateHUD();
  checkAchievements();
}

function triggerGameOver() {
  gameOver=true;
  const stats=loadStats();
  stats.gamesPlayed++;
  if (score>best){best=score;saveBest(best);}
  if (gameMaxMulti>=10){stats.hitMaxMulti=(stats.hitMaxMulti||0)+1;}
  if (gameMaxMulti>=3) stats.hitMulti3=(stats.hitMulti3||0)+1;
  if (gameMaxMulti>=5) stats.hitMulti5=(stats.hitMulti5||0)+1;
  stats.maxPegsInGame=Math.max(stats.maxPegsInGame||0,gamePegsHit);
  stats.hundredSlotInGame=Math.max(stats.hundredSlotInGame||0,gameHundredSlot);
  const hr=new Date().getHours();
  if (hr>=0&&hr<4) stats.nightOwlGames=(stats.nightOwlGames||0)+1;
  saveStats(stats);
  checkAchievements();
  updateHUD();
  submitScore(isDailyMode);
  if (isDailyMode) {
    const key=String(todaySeed()), db=loadDailyBest();
    const prev=db[key], isNew=!prev||score>prev.score;
    if (isNew){db[key]={score,round,...(db[key]||{})};saveDailyBest(db);}
    const claimedTier=claimDailyReward(score);
    dailyResult={score,round,isNew,prev,claimedTier,alreadyClaimed:dailyRewardAlreadyClaimed()&&!claimedTier};
    screen='daily_result'; syncHUD();
  } else {
    if (!username){
      username=loadUsername();
      if (!username){usernamePromptActive=true;usernameInput='';}
    }
    setMsg('out of balls — game over!');
    document.getElementById('rbtn').style.display='inline-block';
  }
}

function afterBallLands() {
  dropping=balls.some(b=>b.active); if (dropping) return;
  if (pendingRoundAdvance){advanceRound();return;}
  if (ballsLeft>0) {
    const needed=milestoneFor(round)-score;
    const ms=multiplier>1?' — x'+multiplier+' active':'';
    setMsg(needed>0?needed+' more to advance'+ms:'milestone hit! keep going...');
  } else {
    if (score>=milestoneFor(round)){advanceRound();}
    else if (!adUsed&&!isDailyMode){adScreen='offer';}
    else{triggerGameOver();}
  }
}

// ── Physics ───────────────────────────────────────────────────────────────────

function update() {
  pulseT+=0.08;
  if (shakeTimer>0){shakeTimer--;shakeX=(Math.random()-0.5)*6*(shakeTimer/12);shakeY=(Math.random()-0.5)*6*(shakeTimer/12);}
  else{shakeX=0;shakeY=0;}
  if (roundFlashTimer>0) roundFlashTimer--;
  const t=Date.now()/1000;
  for (const o of obstacles) {
    if (o.type==='spinner'){o.angle=(o.angle||0)+o.speed;}
    else{o.x=o.baseX+Math.sin(t*Math.abs(o.speed)*60+o.phase)*o.range;o.x=Math.max(2,Math.min(W-o.w-2,o.x));}
  }
  if (newUnlockTimer>0) newUnlockTimer--;
  if (newAchievTimer>0) newAchievTimer--;

  for (let bi=0;bi<balls.length;bi++) {
    const b=balls[bi]; if (!b.active) continue;
    b.trail.push({x:b.x,y:b.y}); if (b.trail.length>14) b.trail.shift();
    b.stuckTimer++;
    if (b.stuckTimer%90===0) {
      const moved=Math.hypot(b.x-b.lastX,b.y-b.lastY);
      if (moved<3) {
        multiplier=1; roundPerfect=false; currentRoundNoDeath=false;
        SFX.stuck(); haptic(20);
        addPopup(b.x,b.y-10,'stuck! x1','#888780');
        addParticles(b.x,b.y,'#888780',6);
        b.active=false; updateHUD(); afterBallLands(); continue;
      }
      b.lastX=b.x; b.lastY=b.y;
    }
    b.vy+=GRAVITY; b.vx*=FRICTION;
    if (b.magnetTimer>0){b.magnetTimer--;b.vx+=(W/2-b.x)*0.003;}
    b.x+=b.vx; b.y+=b.vy;
    if (b.x-b.r<0){b.x=b.r;b.vx=Math.abs(b.vx);}
    if (b.x+b.r>W){b.x=W-b.r;b.vx=-Math.abs(b.vx);}
    for (const p of pegs) {
      const dx=b.x-p.x,dy=b.y-p.y,d=Math.hypot(dx,dy);
      if (d<b.r+p.r) {
        const nx=dx/d,ny=dy/d,ov=b.r+p.r-d;
        b.x+=nx*ov;b.y+=ny*ov;
        const dot=b.vx*nx+b.vy*ny;
        b.vx=(b.vx-2*dot*nx)*BOUNCE; b.vy=(b.vy-2*dot*ny)*BOUNCE;
        if (b.x-b.r<0){b.x=b.r;b.vx=Math.abs(b.vx);}
        if (b.x+b.r>W){b.x=W-b.r;b.vx=-Math.abs(b.vx);}
        if (!p.hit) {
          p.hit=true; p.ht=12; b.pegsHit++; gamePegsHit++;
          const s=loadStats(); s.totalPegsHit=(s.totalPegsHit||0)+1;
          s.maxPegsInDrop=Math.max(s.maxPegsInDrop||0,b.pegsHit);
          saveStats(s);
          SFX.peg(p.y); addParticles(p.x,p.y,dark()?'#AFA9EC':'#7F77DD',3);
        }
      }
      if (p.ht>0){p.ht--;if(p.ht===0)p.hit=false;}
      for (const tok of tokens) {
      if (tok.hit) continue;
      if (Math.hypot(b.x-tok.x,b.y-tok.y)<b.r+tok.r) {
        tok.hit=true; haptic(12);
        tokensThisDrop++;
        if (tokensThisDrop>=2) {
          addPopup(W/2,H/2-20,tokensThisDrop+'x COMBO!',tokensThisDrop>=4?'#FFD700':tokensThisDrop>=3?'#EF9F27':'#D4537E');
          addParticles(W/2,H/2,tokensThisDrop>=4?'#FFD700':'#D4537E',tokensThisDrop*4);
        }
        const s=loadStats(); s.totalTokens=(s.totalTokens||0)+1; saveStats(s);
        if (tok.type==='x+1') {
          multiplier=Math.min(multiplier+1,10);
          if (multiplier>=3){const st=loadStats();st.hitMulti3=Math.max(st.hitMulti3||0,1);saveStats(st);}
          if (multiplier>=5){const st=loadStats();st.hitMulti5=Math.max(st.hitMulti5||0,1);saveStats(st);}
          if (multiplier===10){gameMaxMulti++;const st=loadStats();st.maxMultiInGame=Math.max(st.maxMultiInGame||0,gameMaxMulti);saveStats(st);}
          SFX.multiplier();
          addPopup(tok.x,tok.y-16,'x'+multiplier+'!','#D4537E');
          addParticles(tok.x,tok.y,'#D4537E',10); updateHUD();
        } else if (tok.type==='+ball') {
          pendingBalls++; SFX.token();
          addPopup(tok.x,tok.y-16,'next: '+pendingBalls+'x',BONUS_COL);
          addParticles(tok.x,tok.y,BONUS_COL,10); updateHUD();
        } else if (tok.type==='gem') {
          const g=1+Math.floor(round/5); gems+=g; saveGems(gems);
          const sg=loadStats();sg.totalGems=(sg.totalGems||0)+g;saveStats(sg);
          SFX.gem(); addPopup(tok.x,tok.y-16,'+'+g+' '+getGemEmoji(),'#5DCAA5');
          addParticles(tok.x,tok.y,'#5DCAA5',10); updateHUD();
        } else if (tok.type==='gem_multi') {
          const g=2+Math.floor(round/4); gems+=g; saveGems(gems);
          const sg=loadStats();sg.totalGems=(sg.totalGems||0)+g;saveStats(sg);
          SFX.gem();SFX.multiplier();
          addPopup(tok.x,tok.y-16,'gem x2! +'+g+getGemEmoji(),'#FFD700');
          addParticles(tok.x,tok.y,'#FFD700',14); updateHUD();
        } else if (tok.type==='shield') {
          shieldActive=true; SFX.shield();
          addPopup(tok.x,tok.y-16,'SHIELD ON','#5DCAA5');
          addParticles(tok.x,tok.y,'#5DCAA5',10);
        } else if (tok.type==='magnet') {
          b.magnetTimer=120;
          const sm=loadStats();sm.magnetCollected=(sm.magnetCollected||0)+1;saveStats(sm);
          addPopup(tok.x,tok.y-16,'MAGNET!','#378ADD');
          addParticles(tok.x,tok.y,'#378ADD',10);
        }
      }
    }
    }
    for (const o of obstacles) {
      if (o.type==='spinner') {
        const cos=Math.cos(o.angle),sin=Math.sin(o.angle);
        const lx=b.x-o.x,ly=b.y-o.y;
        const rx=lx*cos+ly*sin,ry=-lx*sin+ly*cos;
        const hw=o.w/2,hh=o.h/2;
        if (Math.abs(rx)<hw+b.r&&Math.abs(ry)<hh+b.r) {
          const oxL=hw+b.r-Math.abs(rx),oyL=hh+b.r-Math.abs(ry);
          const nx2=oxL<oyL?(rx>0?1:-1):0,ny2=oxL<oyL?0:(ry>0?1:-1);
          const wnx=nx2*cos-ny2*sin,wny=nx2*sin+ny2*cos;
          const dot=b.vx*wnx+b.vy*wny;
          b.vx=(b.vx-2*dot*wnx)*BOUNCE; b.vy=(b.vy-2*dot*wny)*BOUNCE;
          b.x+=wnx*2; b.y+=wny*2;
        }
      } else {
        if (b.x>o.x-b.r&&b.x<o.x+o.w+b.r&&b.y>o.y-b.r&&b.y<o.y+o.h+b.r) {
          const oL=b.x-(o.x-b.r),oR=(o.x+o.w+b.r)-b.x,oT=b.y-(o.y-b.r),oB=(o.y+o.h+b.r)-b.y;
          const m=Math.min(oL,oR,oT,oB);
          if(m===oT){b.y=o.y-b.r;b.vy=-Math.abs(b.vy)*BOUNCE;}
          else if(m===oB){b.y=o.y+o.h+b.r;b.vy=Math.abs(b.vy)*BOUNCE;}
          else if(m===oL){b.x=o.x-b.r;b.vx=-Math.abs(b.vx)*BOUNCE;}
          else{b.x=o.x+o.w+b.r;b.vx=Math.abs(b.vx)*BOUNCE;}
        }
      }
    }
    if (b.active&&b.y+b.r>H-SLOT_H){resolveSlot(b);b.active=false;afterBallLands();}
  }
  particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=0.06;p.life-=0.035;});
  particles=particles.filter(p=>p.life>0);
  popups.forEach(p=>{p.y-=0.9;p.life-=0.022;});
  popups=popups.filter(p=>p.life>0);
}

// ── Draw helpers ──────────────────────────────────────────────────────────────

function boardBg() {
  const skin=getBoardSkin();
  if (skin==='seasonal') {
    const ev=getEquippedSeasonalEvent();
    return ev?ev.board:'rgba(18,18,28,0.99)';
  }
  if (skin==='dark')      return 'rgba(18,18,28,0.99)';
  if (skin==='neon')      return 'rgba(8,8,24,0.99)';
  if (skin==='minimal')   return 'rgba(245,245,243,0.99)';
  if (skin==='crimson')   return 'rgba(28,8,8,0.99)';
  if (skin==='starfield') return 'rgba(4,4,20,0.99)';
  if (skin==='white')     return 'rgba(250,250,255,0.99)';
  if (skin==='fire')      return 'rgba(20,6,2,0.99)';
  return dark()?'rgba(30,30,28,0.98)':'rgba(255,255,255,0.98)';
}

function pegColor(hit) {
  const skin=getBoardSkin();
  if (skin==='seasonal') {
    const ev=getEquippedSeasonalEvent();
    if (hit) return ev?ev.pegCol:'#D4537E';
    return 'rgba(255,255,255,0.7)';
  }
  if (hit) return '#D4537E';
  if (skin==='neon')    return '#5DCAA5';
  if (skin==='minimal'||skin==='white') return '#C8C6BE';
  if (skin==='crimson') return '#8B2020';
  if (skin==='fire')    return '#FF4500';
  return dark()||['dark','starfield'].includes(skin)?'#666460':'#B4B2A9';
}

function drawBall(b) {
  const th=getTheme(), trail=getTrail(), fx=getBallFx();
  const pulse=fx==='pulse'?1+Math.sin(pulseT)*0.15:1;
  ctx.globalAlpha=1;
  b.trail.forEach((pt,i)=>{
    const frac=(i+1)/b.trail.length;
    ctx.beginPath(); ctx.arc(pt.x,pt.y,b.r*frac*0.9,0,Math.PI*2);
    if (trail==='seasonal'){
      const ev=getEquippedSeasonalEvent();
      const cols=ev?ev.trailColors:['#7F77DD'];
      ctx.fillStyle=cols[i%cols.length];ctx.globalAlpha=frac*0.75;
    }
    else if (trail==='fire'){ctx.fillStyle=['#FF4500','#FF8C00','#FFD700'][i%3];ctx.globalAlpha=frac*0.7;}
    else if (trail==='rainbow'){ctx.fillStyle=`hsl(${(i*25+pulseT*30)%360},100%,60%)`;ctx.globalAlpha=frac*0.8;}
    else if (trail==='glow'){ctx.fillStyle=th.trail;ctx.globalAlpha=frac*0.7;}
    else if (trail==='gem'){ctx.fillStyle=['#5DCAA5','#B9F2FF','#7F77DD'][i%3];ctx.globalAlpha=frac*0.7;}
    else if (trail==='crown'){ctx.fillStyle=['#FFD700','#FFA500','#FFFF00'][i%3];ctx.globalAlpha=frac*0.7;}
    else if (trail==='glitch'){ctx.fillStyle=i%2===0?'#D4537E':'#5DCAA5';ctx.globalAlpha=frac*0.8;}
    else if (trail==='phoenix'){ctx.fillStyle=['#FF4500','#FFD700','#FF6B2B'][i%3];ctx.globalAlpha=frac*0.7;}
    else{ctx.fillStyle=th.trail;ctx.globalAlpha=frac*0.25;}
    ctx.fill(); ctx.globalAlpha=1;
  });
  if (['glow','pulse','explosion'].includes(fx)) {
    const r2=fx==='explosion'?b.r*pulse+8+Math.sin(pulseT*3)*3:b.r*pulse+5;
    ctx.beginPath(); ctx.arc(b.x,b.y,r2,0,Math.PI*2);
    const g=ctx.createRadialGradient(b.x,b.y,b.r*pulse,b.x,b.y,r2);
    g.addColorStop(0,th.ball+'88'); g.addColorStop(1,th.ball+'00');
    ctx.fillStyle=g; ctx.fill();
  }
  if (b.magnetTimer>0){ctx.beginPath();ctx.arc(b.x,b.y,b.r+4,0,Math.PI*2);ctx.strokeStyle='#378ADD';ctx.lineWidth=2;ctx.globalAlpha=0.6;ctx.stroke();ctx.globalAlpha=1;}
  ctx.beginPath(); ctx.arc(b.x,b.y,b.r*pulse,0,Math.PI*2);
  ctx.fillStyle=th.ball; ctx.fill();
}

// ── Draw username prompt ──────────────────────────────────────────────────────

function drawUsernamePrompt() {
  ctx.fillStyle='rgba(18,18,28,0.94)'; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='rgba(127,119,221,0.15)';
  ctx.beginPath(); ctx.roundRect(W/2-150,H/2-90,300,180,12); ctx.fill();
  ctx.strokeStyle='rgba(127,119,221,0.4)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.roundRect(W/2-150,H/2-90,300,180,12); ctx.stroke();
  ctx.fillStyle='#fff'; ctx.font='600 15px system-ui'; ctx.textAlign='center';
  ctx.fillText(username?'Change username':'Set your username',W/2,H/2-54);
  ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font='400 11px system-ui';
  ctx.fillText(username?'Enter a new username below.':'Shows on your leaderboard. Skip to use a',W/2,H/2-32);
  ctx.fillText(username?'':'random name.',W/2,H/2-16);
  ctx.fillStyle='rgba(255,255,255,0.08)';
  ctx.beginPath(); ctx.roundRect(W/2-110,H/2-4,220,36,8); ctx.fill();
  ctx.strokeStyle='rgba(127,119,221,0.6)'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.roundRect(W/2-110,H/2-4,220,36,8); ctx.stroke();
  if (usernameInput) {
    ctx.fillStyle='#fff'; ctx.font='500 14px system-ui'; ctx.textAlign='center';
    ctx.fillText(usernameInput,W/2,H/2+18);
  } else {
    ctx.fillStyle='rgba(255,255,255,0.25)'; ctx.font='400 13px system-ui'; ctx.textAlign='center';
    ctx.fillText('enter username...',W/2,H/2+18);
  }
  if (Math.floor(Date.now()/500)%2===0) {
    const tw=ctx.measureText(usernameInput).width;
    ctx.fillStyle='#7F77DD'; ctx.fillRect(W/2+tw/2+2,H/2+4,2,14);
  }
  ctx.fillStyle='#7F77DD';
  ctx.beginPath(); ctx.roundRect(W/2-108,H/2+42,100,32,8); ctx.fill();
  ctx.fillStyle='#fff'; ctx.font='600 12px system-ui'; ctx.textAlign='center';
  ctx.fillText('Save',W/2-58,H/2+63);
  ctx.fillStyle='rgba(255,255,255,0.08)';
  ctx.beginPath(); ctx.roundRect(W/2+8,H/2+42,100,32,8); ctx.fill();
  ctx.fillStyle='rgba(255,255,255,0.6)'; ctx.font='600 12px system-ui';
  ctx.fillText('Cancel',W/2+58,H/2+63);
}

// ── Draw leaderboard ──────────────────────────────────────────────────────────

function drawLeaderboard() {
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle='rgba(18,18,28,0.99)';
  ctx.beginPath(); ctx.roundRect(0,0,W,H,12); ctx.fill();

  ctx.fillStyle='rgba(255,255,255,0.08)';
  ctx.beginPath(); ctx.roundRect(12,12,80,30,8); ctx.fill();
  ctx.fillStyle='rgba(255,255,255,0.6)'; ctx.font='500 12px system-ui'; ctx.textAlign='center';
  ctx.fillText('← back',52,32);

  ctx.fillStyle='#7F77DD'; ctx.font='600 18px system-ui'; ctx.textAlign='center';
  ctx.fillText('MY SCORES',W/2,36);
  ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.font='400 11px system-ui';
  ctx.fillText(username||'',W/2,54);

  const tabs=[{id:'all',label:'All Games'},{id:'daily',label:'Daily Only'}];
  tabs.forEach((tab,i)=>{
    const tx=W/2-110+i*115, ty=64, tw=105, th=26;
    ctx.fillStyle=leaderboardTab===tab.id?'rgba(127,119,221,0.3)':'rgba(255,255,255,0.05)';
    ctx.beginPath(); ctx.roundRect(tx,ty,tw,th,6); ctx.fill();
    if (leaderboardTab===tab.id){ctx.strokeStyle='#7F77DD';ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(tx,ty,tw,th,6);ctx.stroke();}
    ctx.fillStyle=leaderboardTab===tab.id?'#fff':'rgba(255,255,255,0.4)';
    ctx.font='500 11px system-ui'; ctx.textAlign='center';
    ctx.fillText(tab.label,tx+tw/2,ty+17);
    tab._x=tx; tab._y=ty; tab._w=tw; tab._h=th;
  });
  drawLeaderboard._tabs=tabs;

  const allScores=loadScores();
  const filtered=leaderboardTab==='daily'?allScores.filter(s=>s.isDaily):allScores;

  if (filtered.length===0) {
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font='400 13px system-ui'; ctx.textAlign='center';
    ctx.fillText('No scores yet — play a game!',W/2,H/2);
    return;
  }

  const pad=14, y0=102;
  ctx.fillStyle='rgba(255,255,255,0.25)'; ctx.font='500 9px system-ui'; ctx.textAlign='left';
  ctx.fillText('#',pad+4,y0); ctx.fillText('NAME',pad+30,y0);
  ctx.fillText('SCORE',pad+160,y0); ctx.fillText('RND',pad+240,y0); ctx.fillText('DATE',pad+275,y0);
  ctx.fillStyle='rgba(255,255,255,0.1)'; ctx.fillRect(pad,y0+4,W-pad*2,1);

  const bestScore=Math.max(...filtered.map(s=>s.score));
  filtered.forEach((entry,i)=>{
    const ey=y0+14+i*32;
    if (ey>H-20) return;
    const isBest=entry.score===bestScore;
    if (isBest){ctx.fillStyle='rgba(239,159,39,0.1)';ctx.beginPath();ctx.roundRect(pad,ey-12,W-pad*2,28,4);ctx.fill();}
    ctx.fillStyle=isBest?'#EF9F27':'rgba(255,255,255,0.5)';
    ctx.font=isBest?'600 12px system-ui':'400 12px system-ui'; ctx.textAlign='left';
    ctx.fillText(i+1,pad+4,ey+4);
    ctx.fillStyle=isBest?'#EF9F27':'rgba(255,255,255,0.8)'; ctx.font='500 12px system-ui';
    const nm=entry.name.length>10?entry.name.slice(0,10)+'…':entry.name;
    ctx.fillText(nm,pad+30,ey+4);
    ctx.fillStyle=isBest?'#EF9F27':'#AFA9EC'; ctx.font='600 12px system-ui';
    ctx.fillText(entry.score.toLocaleString(),pad+160,ey+4);
    ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font='400 11px system-ui';
    ctx.fillText(entry.round,pad+240,ey+4);
    ctx.fillText(entry.date,pad+275,ey+4);
    if (entry.isDaily){ctx.fillStyle='#5DCAA5';ctx.font='400 9px system-ui';ctx.fillText('📅',pad+14,ey-2);}
  });
}

// ── Draw onboarding ───────────────────────────────────────────────────────────

function drawOnboarding() {
  const steps=[
    {title:'Drop the ball',    body:'Click or tap anywhere to aim and drop. The ball bounces through pegs down into scoring slots.'},
    {title:'Score slots',      body:'Each slot scores different points. Hit the center 100-pt slot for big points. The 💎 slot gives you a free ball!'},
    {title:'Tokens',           body:'Floating tokens give bonuses — x+1 raises your multiplier, +ball loads extra balls, 💎 earns gems for the shop.'},
    {title:'Multiplier',       body:'Hit x+1 tokens to chain your multiplier up to x10. Death slots (💀) reset it and cost a ball — avoid them!'},
  ];
  const step=steps[onboardingStep];
  if (!step) return;
  ctx.fillStyle='rgba(18,18,28,0.88)'; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='rgba(127,119,221,0.15)';
  ctx.beginPath(); ctx.roundRect(W/2-150,H/2-80,300,160,12); ctx.fill();
  ctx.strokeStyle='rgba(127,119,221,0.4)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.roundRect(W/2-150,H/2-80,300,160,12); ctx.stroke();
  ctx.fillStyle='#fff'; ctx.font='600 16px system-ui'; ctx.textAlign='center';
  ctx.fillText(step.title,W/2,H/2-44);
  ctx.fillStyle='rgba(255,255,255,0.7)'; ctx.font='400 12px system-ui';
  const words=step.body.split(' '), maxW=260;
  let line='', ly=H/2-18;
  for (const w of words) {
    const test=line+w+' ';
    if (ctx.measureText(test).width>maxW&&line){ctx.fillText(line.trim(),W/2,ly);line=w+' ';ly+=18;}
    else line=test;
  }
  if (line.trim()) ctx.fillText(line.trim(),W/2,ly);
  ctx.fillStyle='#7F77DD';
  ctx.beginPath(); ctx.roundRect(W/2-60,H/2+52,120,32,8); ctx.fill();
  ctx.fillStyle='#fff'; ctx.font='600 12px system-ui';
  ctx.fillText(onboardingStep<steps.length-1?'Next →':'Got it!',W/2,H/2+73);
  ctx.fillStyle='rgba(255,255,255,0.25)'; ctx.font='400 10px system-ui';
  ctx.fillText((onboardingStep+1)+' / '+steps.length,W/2,H/2+96);
}

// ── Draw launch ───────────────────────────────────────────────────────────────
function isDailyDone() {
  const key=String(todaySeed());
  const db=loadDailyBest();
  return !!(db[key]&&(db[key].score!==undefined));
}

function drawSeasonalPicker(activeEvs) {
  const equipped=loadEquippedSeasonal();
  const owned=loadSeasonalOwned();
  ctx.fillStyle='rgba(18,18,28,0.92)'; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='rgba(127,119,221,0.2)';
  ctx.beginPath(); ctx.roundRect(W/2-160,40,320,H-80,14); ctx.fill();
  ctx.strokeStyle='rgba(127,119,221,0.5)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.roundRect(W/2-160,40,320,H-80,14); ctx.stroke();

  ctx.fillStyle='#fff'; ctx.font='600 15px system-ui'; ctx.textAlign='center';
  ctx.fillText('🎨 Custom Themes',W/2,68);
  ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.font='400 10px system-ui';
  ctx.fillText('Free themes for today\'s events',W/2,84);

  const cardH=58, startY=96, pad=16;
  activeEvs.forEach((ev,i)=>{
    const cy=startY+i*cardH;
    if (cy+cardH>H-60) return;
    const isEq=equipped===ev.id;
    ctx.fillStyle=isEq?'rgba(239,159,39,0.2)':'rgba(255,255,255,0.06)';
    ctx.beginPath(); ctx.roundRect(W/2-144,cy,288,cardH-6,8); ctx.fill();
    if (isEq){ctx.strokeStyle='#EF9F27';ctx.lineWidth=1.5;ctx.beginPath();ctx.roundRect(W/2-144,cy,288,cardH-6,8);ctx.stroke();}
    ctx.font='22px system-ui'; ctx.textAlign='center';
    ctx.fillText(ev.emoji,W/2-120,cy+32);
    ctx.fillStyle=isEq?'#EF9F27':'#fff'; ctx.font='600 13px system-ui'; ctx.textAlign='left';
    ctx.fillText(ev.name,W/2-96,cy+20);
    ctx.fillStyle='rgba(255,255,255,0.45)'; ctx.font='400 10px system-ui';
    ctx.fillText(ev.desc,W/2-96,cy+36);
    if (isEq){ctx.fillStyle='#EF9F27';ctx.font='500 10px system-ui';ctx.textAlign='right';ctx.fillText('✓ equipped',W/2+136,cy+20);}
    ev._pickerY=cy; ev._pickerH=cardH-6;
  });

  // Close button
  const closeY=H-58;
  ctx.fillStyle='rgba(255,255,255,0.08)';
  ctx.beginPath(); ctx.roundRect(W/2-80,closeY,160,32,8); ctx.fill();
  ctx.fillStyle='rgba(255,255,255,0.6)'; ctx.font='500 12px system-ui'; ctx.textAlign='center';
  ctx.fillText('close',W/2,closeY+21);
  drawSeasonalPicker._closeY=closeY;
  drawSeasonalPicker._activeEvs=activeEvs;
}

function drawLaunch() {
  const dailyDone=isDailyDone();
  const activeEvs=getActiveEvents();
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle='rgba(18,18,28,0.99)';
  ctx.beginPath(); ctx.roundRect(0,0,W,H,12); ctx.fill();
  drawStarfield();

  for (let row=0;row<5;row++) {
    const count=8, offset=row%2===0?0:(W/(count-1))/2;
    for (let col=0;col<count;col++) {
      const x=offset+(col/(count-1))*(W-20)+10, y=90+row*55;
      const alpha=0.06+Math.sin(launchAnimT+row*0.5+col*0.3)*0.04;
      ctx.beginPath(); ctx.arc(x,y,PEG_R,0,Math.PI*2);
      ctx.fillStyle=`rgba(127,119,221,${alpha})`; ctx.fill();
    }
  }

  ctx.fillStyle='#fff'; ctx.font='700 38px system-ui'; ctx.textAlign='center';
  ctx.fillText('DROPZONE',W/2,H/2-90);
  ctx.fillStyle='rgba(175,169,236,0.7)'; ctx.font='400 12px system-ui';
  ctx.fillText('aim. drop. score.',W/2,H/2-70);

  const seasonalEquipped=loadEquippedSeasonal();
  if (activeEvs.length>0) {
    const equippedEv=activeEvs.find(e=>e.id===seasonalEquipped);
    ctx.fillStyle=equippedEv?'rgba(239,159,39,0.2)':'rgba(127,119,221,0.2)';
    ctx.fillRect(0,0,W,36);
    ctx.fillStyle='#fff'; ctx.font='600 11px system-ui'; ctx.textAlign='center';
    const evEmojis=activeEvs.slice(0,4).map(e=>e.emoji).join(' ');
    ctx.fillText('🎨 Custom Themes  '+evEmojis,W/2,14);
    ctx.fillStyle=equippedEv?'#EF9F27':'rgba(175,169,236,0.9)'; ctx.font='400 9px system-ui';
    ctx.fillText(equippedEv?'equipped: '+equippedEv.name+' — tap to change':'tap to pick a free seasonal theme',W/2,27);
    drawLaunch._seasonalBanner={y:0,h:36,activeEvs};
  } else {
    drawLaunch._seasonalBanner=null;
  }

  const btns=[
    {label:'▶  PLAY',            y:H/2-30,  bg:'#7F77DD',                   fg:'#fff',                  w:220},
    {label:'📅  Daily Challenge', y:H/2+10,  bg:dailyDone?'rgba(255,255,255,0.04)':'rgba(93,202,165,0.15)', fg:dailyDone?'rgba(255,255,255,0.25)':'#5DCAA5', w:220, border:dailyDone?'rgba(255,255,255,0.1)':'#5DCAA5'},
    {label:'🏆  Achievements',    y:H/2+75,  bg:'rgba(239,159,39,0.12)',     fg:'#EF9F27',               w:220, border:'#EF9F27'},
    {label:'📊  My Scores',       y:H/2+125, bg:'rgba(127,119,221,0.12)',    fg:'#7F77DD',               w:220, border:'#7F77DD'},
    {label:'💎  Shop',            y:H/2+175, bg:'rgba(127,119,221,0.12)',    fg:'#7F77DD',               w:220, border:'#7F77DD'},
    {label:'⚙  Settings',         y:H/2+225, bg:'rgba(255,255,255,0.06)',    fg:'rgba(255,255,255,0.6)', w:220, border:'rgba(255,255,255,0.2)'},
  ];

  btns.forEach(btn=>{
    ctx.fillStyle=btn.bg;
    ctx.beginPath(); ctx.roundRect(W/2-btn.w/2,btn.y-18,btn.w,36,9); ctx.fill();
    if (btn.border){ctx.strokeStyle=btn.border;ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(W/2-btn.w/2,btn.y-18,btn.w,36,9);ctx.stroke();}
    ctx.fillStyle=btn.fg; ctx.font='600 14px system-ui'; ctx.textAlign='center';
    ctx.fillText(btn.label,W/2,btn.y+5);
    btn._y=btn.y-18; btn._h=36; btn._w=btn.w;
  });

  if (dailyDone) {
    ctx.fillStyle='rgba(255,255,255,0.2)'; ctx.font='400 9px system-ui'; ctx.textAlign='center';
    ctx.fillText('resets at midnight',W/2,H/2+38);
  }

  drawLaunch._btns=btns;

  const ballY=44+((Math.sin(launchAnimT*1.2)+1)/2)*(H/2-200);
  const th=getTheme();
  ctx.beginPath(); ctx.arc(W/2,ballY,BALL_R+2,0,Math.PI*2);
  ctx.fillStyle=th.ball+'44'; ctx.fill();
  ctx.beginPath(); ctx.arc(W/2,ballY,BALL_R,0,Math.PI*2);
  ctx.fillStyle=th.ball; ctx.fill();

  ctx.fillStyle='#fff'; ctx.font='400 11px system-ui'; ctx.textAlign='center';
  ctx.fillText('best: '+loadBest().toLocaleString()+'  |  💎 '+loadGems(),W/2,H-12);

  if (seasonalPickerOpen&&activeEvs.length>0) drawSeasonalPicker(activeEvs);
}

// ── Draw settings ─────────────────────────────────────────────────────────────

function drawSettings() {
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle='rgba(18,18,28,0.99)';
  ctx.beginPath(); ctx.roundRect(0,0,W,H,12); ctx.fill();

  ctx.fillStyle='rgba(255,255,255,0.08)';
  ctx.beginPath(); ctx.roundRect(12,12,80,30,8); ctx.fill();
  ctx.fillStyle='rgba(255,255,255,0.6)'; ctx.font='500 12px system-ui'; ctx.textAlign='center';
  ctx.fillText('← back',52,32);
  drawSettings._backY=12; drawSettings._backH=30;

  ctx.fillStyle='#fff'; ctx.font='600 18px system-ui'; ctx.textAlign='center';
  ctx.fillText('SETTINGS',W/2,36);

  const stats=loadStats();
  const items=[
    {type:'toggle',label:'Sound',    value:soundEnabled,    id:'sound',y:80},
    {type:'toggle',label:'Vibration',value:vibrationEnabled,id:'vibe', y:130},
    {type:'button',label:'Change Username',sublabel:username||'not set',id:'username',y:180},
    {type:'section',label:'YOUR STATS',y:235},
    {type:'stat',label:'Games Played',        value:stats.gamesPlayed||0,                   y:262},
    {type:'stat',label:'Total Score',         value:(stats.totalScore||0).toLocaleString(),  y:292},
    {type:'stat',label:'Best Round',          value:stats.bestRound||0,                     y:322},
    {type:'stat',label:'Gems Earned',         value:(stats.totalGems||0).toLocaleString(),   y:352},
    {type:'stat',label:'Balls Dropped',       value:(stats.totalBalls||0).toLocaleString(),  y:382},
    {type:'stat',label:'Death Slots Survived',value:stats.deathsSurvived||0,                y:412},
    {type:'stat',label:'Pegs Hit',            value:(stats.totalPegsHit||0).toLocaleString(),y:442},
    {type:'section',label:'PRIVACY',y:468},
    {type:'text',label:'Dropzone stores all data locally on your device. No account, no tracking, no data sent anywhere.',y:486},
  ];

  items.forEach(item=>{
    if (item.type==='section'){
      ctx.fillStyle='#888780'; ctx.font='500 10px system-ui'; ctx.textAlign='left';
      ctx.fillText(item.label,20,item.y);
    } else if (item.type==='toggle'){
      ctx.fillStyle='rgba(255,255,255,0.06)';
      ctx.beginPath(); ctx.roundRect(16,item.y-20,W-32,44,8); ctx.fill();
      ctx.fillStyle='rgba(255,255,255,0.7)'; ctx.font='500 14px system-ui'; ctx.textAlign='left';
      ctx.fillText(item.label,32,item.y+6);
      const tx=W-60,ty=item.y-8,tw=44,th=24;
      ctx.fillStyle=item.value?'#7F77DD':'rgba(255,255,255,0.15)';
      ctx.beginPath(); ctx.roundRect(tx,ty,tw,th,12); ctx.fill();
      ctx.fillStyle='#fff';
      ctx.beginPath(); ctx.arc(item.value?tx+tw-12:tx+12,ty+th/2,9,0,Math.PI*2); ctx.fill();
      item._y=item.y-20; item._h=44;
    } else if (item.type==='button'){
      ctx.fillStyle='rgba(255,255,255,0.06)';
      ctx.beginPath(); ctx.roundRect(16,item.y-20,W-32,44,8); ctx.fill();
      ctx.fillStyle='rgba(255,255,255,0.7)'; ctx.font='500 14px system-ui'; ctx.textAlign='left';
      ctx.fillText(item.label,32,item.y+2);
      ctx.fillStyle='rgba(255,255,255,0.35)'; ctx.font='400 11px system-ui';
      ctx.fillText(item.sublabel,32,item.y+18);
      ctx.fillStyle='#7F77DD'; ctx.font='500 11px system-ui'; ctx.textAlign='right';
      ctx.fillText('edit →',W-32,item.y+2);
      item._y=item.y-20; item._h=44;
    } else if (item.type==='stat'){
      ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font='400 13px system-ui'; ctx.textAlign='left';
      ctx.fillText(item.label,28,item.y);
      ctx.fillStyle='#AFA9EC'; ctx.font='500 13px system-ui'; ctx.textAlign='right';
      ctx.fillText(item.value,W-28,item.y);
    } else if (item.type==='text'){
      ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.font='400 11px system-ui'; ctx.textAlign='left';
      const words=item.label.split(' '), maxW=W-40;
      let line='', ly=item.y;
      for (const w of words){
        const test=line+w+' ';
        if (ctx.measureText(test).width>maxW&&line){ctx.fillText(line.trim(),20,ly);line=w+' ';ly+=16;}
        else line=test;
      }
      if (line.trim()) ctx.fillText(line.trim(),20,ly);
    }
  });
  drawSettings._items=items;
  if (usernamePromptActive) drawUsernamePrompt();
}


// ── Draw achievements ─────────────────────────────────────────────────────────

function drawAchievements() {
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle='rgba(18,18,28,0.99)';
  ctx.beginPath(); ctx.roundRect(0,0,W,H,12); ctx.fill();

  ctx.fillStyle='rgba(255,255,255,0.08)';
  ctx.beginPath(); ctx.roundRect(12,12,80,30,8); ctx.fill();
  ctx.fillStyle='rgba(255,255,255,0.6)'; ctx.font='500 12px system-ui'; ctx.textAlign='center';
  ctx.fillText('← back',52,32);
  drawAchievements._backY=12; drawAchievements._backH=30;

  ctx.fillStyle='#EF9F27'; ctx.font='600 18px system-ui'; ctx.textAlign='center';
  ctx.fillText('ACHIEVEMENTS',W/2,36);

  const done=achieved.length, total=ACHIEVEMENTS.length;
  ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.font='400 12px system-ui';
  ctx.fillText(done+' / '+total+' unlocked',W/2,56);

  const cats=[
    {id:'score',label:'Score — Best Game'},
    {id:'total',label:'Score — Cumulative'},
    {id:'round',label:'Rounds'},
    {id:'skill',label:'Skill'},
    {id:'gems', label:'Gems & Economy'},
    {id:'death',label:'Death & Survival'},
    {id:'meta', label:'Meta'},
  ];

  let y=72-achieveScroll, pad=14;
  for (const cat of cats) {
    const items=ACHIEVEMENTS.filter(a=>a.cat===cat.id);
    if (y+16>60&&y<H-10){ctx.fillStyle='#888780';ctx.font='600 10px system-ui';ctx.textAlign='left';ctx.fillText(cat.label.toUpperCase(),pad,y+12);}
    y+=26;
    for (const ach of items) {
      const unlocked=isAchieved(ach.id);
      const cardH=68;
      if (y+cardH>60&&y<H-10) {
        ctx.fillStyle=unlocked?'rgba(239,159,39,0.12)':'rgba(255,255,255,0.04)';
        ctx.beginPath(); ctx.roundRect(pad,y,W-pad*2,cardH-4,8); ctx.fill();
        if (unlocked){ctx.strokeStyle='rgba(239,159,39,0.4)';ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(pad,y,W-pad*2,cardH-4,8);ctx.stroke();}
        ctx.font='20px system-ui'; ctx.textAlign='center';
        ctx.globalAlpha=unlocked?1:0.3;
        ctx.fillText(unlocked?'🏆':'🔒',pad+20,y+28);
        ctx.globalAlpha=1;
        ctx.fillStyle=unlocked?'#EF9F27':'rgba(255,255,255,0.5)';
        ctx.font='600 13px system-ui'; ctx.textAlign='left';
        ctx.fillText(ach.label,pad+42,y+20);
        ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.font='400 11px system-ui';
        ctx.fillText(ach.desc,pad+42,y+36);
        if (!unlocked) {
          const stats=loadStats(); stats.best=loadBest();
          let cur=0, goal=1;
          const id=ach.id;
          if (id==='ach_score_500')       {cur=stats.best;goal=500;}
          else if (id==='ach_score_1k')   {cur=stats.best;goal=1000;}
          else if (id==='ach_score_5k')   {cur=stats.best;goal=5000;}
          else if (id==='ach_score_10k')  {cur=stats.best;goal=10000;}
          else if (id==='ach_score_25k')  {cur=stats.best;goal=25000;}
          else if (id==='ach_score_50k')  {cur=stats.best;goal=50000;}
          else if (id==='ach_score_100k') {cur=stats.best;goal=100000;}
          else if (id==='ach_score_250k') {cur=stats.best;goal=250000;}
          else if (id==='ach_score_500k') {cur=stats.best;goal=500000;}
          else if (id==='ach_score_1m')   {cur=stats.best;goal=1000000;}
          else if (id==='ach_score_2500k'){cur=stats.best;goal=2500000;}
          else if (id==='ach_score_5m')   {cur=stats.best;goal=5000000;}
          else if (id==='ach_score_10m')  {cur=stats.best;goal=10000000;}
          else if (id==='ach_score_50m')  {cur=stats.best;goal=50000000;}
          else if (id==='ach_total_1k')   {cur=stats.totalScore;goal=1000;}
          else if (id==='ach_total_10k')  {cur=stats.totalScore;goal=10000;}
          else if (id==='ach_total_50k')  {cur=stats.totalScore;goal=50000;}
          else if (id==='ach_total_100k') {cur=stats.totalScore;goal=100000;}
          else if (id==='ach_total_500k') {cur=stats.totalScore;goal=500000;}
          else if (id==='ach_total_1m')   {cur=stats.totalScore;goal=1000000;}
          else if (id==='ach_total_5m')   {cur=stats.totalScore;goal=5000000;}
          else if (id==='ach_total_10m')  {cur=stats.totalScore;goal=10000000;}
          else if (id==='ach_total_50m')  {cur=stats.totalScore;goal=50000000;}
          else if (id==='ach_total_100m') {cur=stats.totalScore;goal=100000000;}
          else if (id==='ach_total_500m') {cur=stats.totalScore;goal=500000000;}
          else if (id==='ach_total_1b')   {cur=stats.totalScore;goal=1000000000;}
          else if (id==='ach_round_5')    {cur=stats.bestRound;goal=5;}
          else if (id==='ach_round_10')   {cur=stats.bestRound;goal=10;}
          else if (id==='ach_round_15')   {cur=stats.bestRound;goal=15;}
          else if (id==='ach_round_25')   {cur=stats.bestRound;goal=25;}
          else if (id==='ach_round_35')   {cur=stats.bestRound;goal=35;}
          else if (id==='ach_round_50')   {cur=stats.bestRound;goal=50;}
          else if (id==='ach_round_75')   {cur=stats.bestRound;goal=75;}
          else if (id==='ach_round_100')  {cur=stats.bestRound;goal=100;}
          else if (id==='ach_round_150')  {cur=stats.bestRound;goal=150;}
          else if (id==='ach_round_200')  {cur=stats.bestRound;goal=200;}
          else if (id==='ach_round_300')  {cur=stats.bestRound;goal=300;}
          else if (id==='ach_round_500')  {cur=stats.bestRound;goal=500;}
          else if (id==='ach_multi_10x5games'){cur=stats.hitMaxMulti;goal=5;}
          else if (id==='ach_multi_10x25'){cur=stats.hitMaxMulti;goal=25;}
          else if (id==='ach_perfect_5')  {cur=stats.perfectRounds;goal=5;}
          else if (id==='ach_perfect_25') {cur=stats.perfectRounds;goal=25;}
          else if (id==='ach_100slot_10') {cur=stats.hundredSlotHits;goal=10;}
          else if (id==='ach_100slot_50') {cur=stats.hundredSlotHits;goal=50;}
          else if (id==='ach_gem_1')      {cur=stats.totalGems;goal=1;}
          else if (id==='ach_gem_10')     {cur=stats.totalGems;goal=10;}
          else if (id==='ach_gem_100')    {cur=stats.totalGems;goal=100;}
          else if (id==='ach_gem_500')    {cur=stats.totalGems;goal=500;}
          else if (id==='ach_gem_2500')   {cur=stats.totalGems;goal=2500;}
          else if (id==='ach_gem_10k')    {cur=stats.totalGems;goal=10000;}
          else if (id==='ach_gem_50k')    {cur=stats.totalGems;goal=50000;}
          else if (id==='ach_shop_1')     {cur=stats.shopItemsBought;goal=1;}
          else if (id==='ach_shop_5')     {cur=stats.shopItemsBought;goal=5;}
          else if (id==='ach_shop_10')    {cur=stats.shopItemsBought;goal=10;}
          else if (id==='ach_shop_all')   {cur=stats.shopItemsBought;goal=SHOP_ITEMS.length;}
          else if (id==='ach_token_100')  {cur=stats.totalTokens;goal=100;}
          else if (id==='ach_token_1k')   {cur=stats.totalTokens;goal=1000;}
          else if (id==='ach_death_10')   {cur=stats.deathsSurvived;goal=10;}
          else if (id==='ach_death_50')   {cur=stats.deathsSurvived;goal=50;}
          else if (id==='ach_death_200')  {cur=stats.deathsSurvived;goal=200;}
          else if (id==='ach_shield_10')  {cur=stats.shieldUsed;goal=10;}
          else if (id==='ach_shield_50')  {cur=stats.shieldUsed;goal=50;}
          else if (id==='ach_games_10')   {cur=stats.gamesPlayed;goal=10;}
          else if (id==='ach_games_50')   {cur=stats.gamesPlayed;goal=50;}
          else if (id==='ach_games_100')  {cur=stats.gamesPlayed;goal=100;}
          else if (id==='ach_games_500')  {cur=stats.gamesPlayed;goal=500;}
          else if (id==='ach_games_1k')   {cur=stats.gamesPlayed;goal=1000;}
          else if (id==='ach_daily_7')    {cur=stats.dailyChallengesPlayed;goal=7;}
          else if (id==='ach_daily_30')   {cur=stats.dailyChallengesPlayed;goal=30;}
          else if (id==='ach_balls_100')  {cur=stats.totalBalls;goal=100;}
          else if (id==='ach_balls_1k')   {cur=stats.totalBalls;goal=1000;}
          else if (id==='ach_balls_10k')  {cur=stats.totalBalls;goal=10000;}
          else if (id==='ach_magnet_10')  {cur=stats.magnetCollected;goal=10;}
          else if (id==='ach_magnet_50')  {cur=stats.magnetCollected;goal=50;}
          else if (id==='ach_pegs_total_10k'){cur=stats.totalPegsHit;goal=10000;}
          else if (id==='ach_unlocked_10'){cur=stats.achievementsUnlocked;goal=10;}
          else if (id==='ach_unlocked_50'){cur=stats.achievementsUnlocked;goal=50;}
          const pct=Math.min(1,cur/goal);
          const bx=pad+42,bw=W-pad*2-42-8,bh=4,by=y+48;
          ctx.fillStyle='rgba(255,255,255,0.1)';
          ctx.beginPath(); ctx.roundRect(bx,by,bw,bh,2); ctx.fill();
          ctx.fillStyle=pct>=0.75?'#5DCAA5':pct>=0.4?'#EF9F27':'#7F77DD';
          ctx.beginPath(); ctx.roundRect(bx,by,bw*pct,bh,2); ctx.fill();
          ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font='400 9px system-ui'; ctx.textAlign='right';
          const dispCur=cur>=1000000?(cur/1000000).toFixed(1)+'M':cur>=1000?(cur/1000).toFixed(1)+'K':cur;
          const dispGoal=goal>=1000000?(goal/1000000).toFixed(0)+'M':goal>=1000?(goal/1000).toFixed(0)+'K':goal;
          ctx.fillText(dispCur+' / '+dispGoal,W-pad-8,by+3);
        } else {
          ctx.fillStyle='#5DCAA5'; ctx.font='400 10px system-ui'; ctx.textAlign='left';
          ctx.fillText('✓ '+ach.reward.label,pad+42,y+52);
        }
      }
      y+=cardH;
    }
    y+=10;
  }
  drawAchievements._totalH=y+achieveScroll;
  if ((drawAchievements._totalH||0)>H+achieveScroll){
    ctx.fillStyle='rgba(239,159,39,0.4)'; ctx.font='400 11px system-ui'; ctx.textAlign='center';
    ctx.fillText('scroll for more ↓',W/2,H-14);
  }
}

// ── Draw game ─────────────────────────────────────────────────────────────────

function drawGame() {
  ctx.clearRect(0,0,W,H);
  if (shakeX||shakeY) ctx.translate(shakeX,shakeY);
  const skin=getBoardSkin(), dk=dark();
  ctx.fillStyle=boardBg();
  ctx.beginPath(); ctx.roundRect(0,0,W,H,12); ctx.fill();

  if (skin==='neon'){
    ctx.strokeStyle='rgba(93,202,165,0.06)'; ctx.lineWidth=0.5;
    for (let y=0;y<H;y+=20){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    for (let x=0;x<W;x+=20){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  }
  if (skin==='starfield') drawStarfield();
  if (skin==='fire') {
    for (let i=0;i<3;i++){
      const fy=H-30+Math.sin(pulseT*2+i)*15;
      const g=ctx.createRadialGradient(W/2,fy,0,W/2,fy,120+i*30);
      g.addColorStop(0,'rgba(255,100,0,0.08)'); g.addColorStop(1,'rgba(255,0,0,0)');
      ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    }
  }

  if (isDailyMode){
    ctx.fillStyle='rgba(93,202,165,0.12)'; ctx.fillRect(0,0,W,20);
    ctx.fillStyle='#5DCAA5'; ctx.font='500 10px system-ui'; ctx.textAlign='center';
    ctx.fillText('📅 DAILY CHALLENGE',W/2,13);
  }

  for (let i=0;i<SLOTS;i++){
    const x=i*SLOT_W, isB=bonusSlots.includes(i), isD=deathSlots.includes(i);
    const sc=isD?'#E24B4A':isB?BONUS_COL:SLOT_COLS[i];
    ctx.fillStyle=sc+(dk||skin!=='minimal'&&skin!=='white'?'44':'22');
    ctx.fillRect(x+1,H-SLOT_H,SLOT_W-2,SLOT_H);
    ctx.fillStyle=sc; ctx.font='500 9px system-ui'; ctx.textAlign='center';
    if (isD) ctx.fillText('💀',x+SLOT_W/2,H-SLOT_H+11);
    else if (isB) ctx.fillText(getGemEmoji(),x+SLOT_W/2,H-SLOT_H+11);
    ctx.font='500 11px system-ui';
    ctx.fillText(isD?'-ball':BASE_SCORES[i]+(multiplier>1?'×'+multiplier:''),x+SLOT_W/2,H-8);
  }
  ctx.strokeStyle=dk||['dark','neon','crimson','starfield','fire'].includes(skin)?'#444441':'#D3D1C7'; ctx.lineWidth=0.5;
  ctx.beginPath(); ctx.moveTo(0,H-SLOT_H); ctx.lineTo(W,H-SLOT_H); ctx.stroke();
  for (let i=1;i<SLOTS;i++){ctx.beginPath();ctx.moveTo(i*SLOT_W,H-SLOT_H);ctx.lineTo(i*SLOT_W,H);ctx.stroke();}

  for (const o of obstacles){
    ctx.save();
    const oc=skin==='neon'?'#5DCAA5':dk||['dark','crimson','starfield','fire'].includes(skin)?'#3C3489':'#CEC0F6';
    const os=skin==='neon'?'#5DCAA5':dk?'#7F77DD':'#534AB7';
    if (o.type==='spinner'){ctx.translate(o.x,o.y);ctx.rotate(o.angle||0);ctx.fillStyle=oc;ctx.strokeStyle=os;ctx.lineWidth=1;ctx.fillRect(-o.w/2,-o.h/2,o.w,o.h);ctx.strokeRect(-o.w/2,-o.h/2,o.w,o.h);}
    else{ctx.fillStyle=oc;ctx.strokeStyle=os;ctx.lineWidth=0.5;ctx.fillRect(o.x,o.y,o.w,o.h);ctx.strokeRect(o.x,o.y,o.w,o.h);}
    ctx.restore();
  }

  for (const p of pegs){
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r+(p.hit?2:0),0,Math.PI*2);
    if (skin==='neon'&&!p.hit){ctx.fillStyle='#5DCAA522';ctx.fill();ctx.strokeStyle='#5DCAA5';ctx.lineWidth=1;ctx.stroke();}
    else{ctx.fillStyle=pegColor(p.hit);ctx.fill();}
  }

  for (const tok of tokens){
    if (tok.hit) continue;
    let col='#D4537E';
    if (tok.type==='+ball')    col=BONUS_COL;
    if (tok.type==='gem_multi')col='#FFD700';
    if (tok.type==='shield')   col='#378ADD';
    if (tok.type==='magnet')   col='#7F77DD';
    const pulse=0.7+Math.sin(pulseT*1.5)*0.3;
    if (tok.type==='gem') {
      const scale=0.9+Math.sin(pulseT*1.5)*0.1;
      ctx.save();
      ctx.translate(tok.x,tok.y);
      ctx.scale(scale,scale);
      ctx.font='16px system-ui'; ctx.textAlign='center';
      ctx.fillText(getGemEmoji(),0,6);
      ctx.restore();
    } else {
      ctx.beginPath(); ctx.arc(tok.x,tok.y,tok.r+3*pulse,0,Math.PI*2);
      ctx.strokeStyle=col+'66'; ctx.lineWidth=2; ctx.stroke();
      ctx.beginPath(); ctx.arc(tok.x,tok.y,tok.r,0,Math.PI*2);
      ctx.fillStyle=col; ctx.fill();
      ctx.strokeStyle='#fff'; ctx.lineWidth=1.5; ctx.stroke();
      ctx.fillStyle='#fff'; ctx.font='600 8px system-ui'; ctx.textAlign='center';
      const lbl={'x+1':'x'+(Math.min(multiplier+1,10)),'+ball':'+1',gem_multi:'💎x2',shield:'SHD',magnet:'MAG'};
      ctx.fillText(lbl[tok.type]||tok.type,tok.x,tok.y+3);
    }
  }

  if (shieldActive){ctx.font='500 11px system-ui';ctx.textAlign='center';ctx.fillStyle='#5DCAA5';ctx.fillText('🛡 shield active',W/2,isDailyMode?36:26);}
  const nextPu=POWERUP_THRESHOLDS.find(p=>!hasPowerup(p.id));
  if (nextPu&&score<nextPu.score){ctx.font='400 10px system-ui';ctx.textAlign='right';ctx.fillStyle='rgba(175,169,236,0.5)';ctx.fillText(nextPu.label+' at '+nextPu.score.toLocaleString(),W-8,isDailyMode?36:26);}

  if (!gameOver&&!dropping&&aimX>=0&&hasPowerup('path')){
    const pts=simulatePath(aimX);
    if (pts.length>1){
      ctx.setLineDash([3,5]); ctx.strokeStyle='rgba(255,255,255,0.2)'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y);
      for (let i=1;i<pts.length;i++) ctx.lineTo(pts[i].x,pts[i].y);
      ctx.stroke(); ctx.setLineDash([]);
      const last=pts[pts.length-1];
      ctx.beginPath(); ctx.arc(last.x,last.y,4,0,Math.PI*2);
      ctx.fillStyle='rgba(255,255,255,0.35)'; ctx.fill();
    }
  }

  for (const b of balls){if(b.active)drawBall(b);}

  if (!gameOver&&!dropping&&aimX>=0){
    const th=getTheme();
    ctx.setLineDash([4,6]); ctx.strokeStyle='rgba(255,255,255,0.2)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(aimX,0); ctx.lineTo(aimX,50); ctx.stroke(); ctx.setLineDash([]);
    for (let i=0;i<pendingBalls;i++){
      const spread=(i-(pendingBalls-1)/2)*6;
      ctx.beginPath(); ctx.arc(aimX+spread,8,BALL_R,0,Math.PI*2);
      ctx.fillStyle=th.ball+'88'; ctx.fill();
    }
  }

  particles.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=p.col;ctx.globalAlpha=p.life;ctx.fill();ctx.globalAlpha=1;});
  popups.forEach(p=>{ctx.font='500 13px system-ui';ctx.textAlign='center';ctx.fillStyle=p.col;ctx.globalAlpha=p.life;ctx.fillText(p.txt,p.x,p.y);ctx.globalAlpha=1;});

  if (newUnlockMsg&&newUnlockTimer>0){
    const alpha=Math.min(1,newUnlockTimer/30); ctx.globalAlpha=alpha;
    ctx.fillStyle='rgba(18,18,28,0.92)'; ctx.fillRect(W/2-140,H/2-32,280,60);
    ctx.fillStyle='#EF9F27'; ctx.font='600 14px system-ui'; ctx.textAlign='center'; ctx.fillText(newUnlockMsg,W/2,H/2-8);
    ctx.fillStyle='#fff'; ctx.font='400 11px system-ui'; ctx.fillText('collect tokens on the board to use it',W/2,H/2+14);
    ctx.globalAlpha=1;
  }
  if (newAchievMsg&&newAchievTimer>0){
    const alpha=Math.min(1,newAchievTimer/30); ctx.globalAlpha=alpha;
    ctx.fillStyle='rgba(18,18,28,0.92)';
    ctx.beginPath(); ctx.roundRect(W/2-145,H/2+44,290,68,8); ctx.fill();
    ctx.fillStyle='#EF9F27'; ctx.font='600 13px system-ui'; ctx.textAlign='center';
    ctx.fillText(newAchievMsg,W/2,H/2+64);
    ctx.fillStyle='rgba(255,255,255,0.7)'; ctx.font='400 11px system-ui';
    ctx.fillText(newAchievDesc||'',W/2,H/2+82);
    ctx.fillStyle='#5DCAA5'; ctx.font='400 10px system-ui';
    ctx.fillText('achievement unlocked!',W/2,H/2+98);
    ctx.globalAlpha=1;
  }

  if (roundFlashTimer>0){
    const alpha=roundFlashTimer>30?1:(roundFlashTimer/30);
    const scale=roundFlashTimer>45?1+(60-roundFlashTimer)*0.02:1;
    ctx.globalAlpha=alpha*0.85;
    ctx.fillStyle='rgba(18,18,28,0.7)'; ctx.fillRect(0,0,W,H);
    ctx.globalAlpha=alpha;
    ctx.save();
    ctx.translate(W/2,H/2); ctx.scale(scale,scale);
    ctx.fillStyle='#7F77DD'; ctx.font='700 56px system-ui'; ctx.textAlign='center';
    ctx.fillText('ROUND',0,-20);
    ctx.fillStyle='#fff'; ctx.font='700 72px system-ui';
    ctx.fillText(roundFlashNum,0,62);
    ctx.restore(); ctx.globalAlpha=1;
  }

  if (gameOver&&!isDailyMode){
    ctx.fillStyle='rgba(18,18,28,0.92)'; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#F0997B'; ctx.font='600 24px system-ui'; ctx.textAlign='center';
    ctx.fillText('game over',W/2,H/2-110);
    ctx.fillStyle='#AFA9EC'; ctx.font='500 14px system-ui';
    ctx.fillText('round '+round+'  —  score: '+score.toLocaleString(),W/2,H/2-84);
    ctx.fillStyle='#EF9F27'; ctx.font='600 13px system-ui';
    ctx.fillText('best: '+best.toLocaleString(),W/2,H/2-62);
    ctx.fillStyle='#5DCAA5'; ctx.font='500 12px system-ui';
    ctx.fillText('💎 '+gems+' gems',W/2,H/2-42);
    const stats=loadStats(); stats.best=loadBest();
    const close=[];
    for (const ach of ACHIEVEMENTS){
      if (isAchieved(ach.id)) continue;
      let cur=0,goal=1;
      const id=ach.id;
      if (id==='ach_score_500')       {cur=stats.best;goal=500;}
      else if (id==='ach_score_1k')   {cur=stats.best;goal=1000;}
      else if (id==='ach_score_5k')   {cur=stats.best;goal=5000;}
      else if (id==='ach_score_10k')  {cur=stats.best;goal=10000;}
      else if (id==='ach_score_25k')  {cur=stats.best;goal=25000;}
      else if (id==='ach_score_50k')  {cur=stats.best;goal=50000;}
      else if (id==='ach_score_100k') {cur=stats.best;goal=100000;}
      else if (id==='ach_total_1k')   {cur=stats.totalScore;goal=1000;}
      else if (id==='ach_total_10k')  {cur=stats.totalScore;goal=10000;}
      else if (id==='ach_total_50k')  {cur=stats.totalScore;goal=50000;}
      else if (id==='ach_total_100k') {cur=stats.totalScore;goal=100000;}
      else if (id==='ach_round_5')    {cur=stats.bestRound;goal=5;}
      else if (id==='ach_round_10')   {cur=stats.bestRound;goal=10;}
      else if (id==='ach_round_15')   {cur=stats.bestRound;goal=15;}
      else if (id==='ach_round_25')   {cur=stats.bestRound;goal=25;}
      else if (id==='ach_games_1')    {cur=stats.gamesPlayed;goal=1;}
      else if (id==='ach_games_10')   {cur=stats.gamesPlayed;goal=10;}
      else if (id==='ach_games_50')   {cur=stats.gamesPlayed;goal=50;}
      else if (id==='ach_balls_100')  {cur=stats.totalBalls;goal=100;}
      else if (id==='ach_balls_1k')   {cur=stats.totalBalls;goal=1000;}
      else if (id==='ach_death_10')   {cur=stats.deathsSurvived;goal=10;}
      else if (id==='ach_gem_1')      {cur=stats.totalGems;goal=1;}
      else if (id==='ach_gem_10')     {cur=stats.totalGems;goal=10;}
      else if (id==='ach_gem_100')    {cur=stats.totalGems;goal=100;}
      else { continue; }
      const pct=cur/goal;
      if (pct>=0.5&&pct<1) close.push({ach,pct,cur,goal});
    }
    ctx.fillStyle='rgba(127,119,221,0.5)'; ctx.font='500 11px system-ui'; ctx.textAlign='center';
    ctx.fillText('↓ play again below',W/2,H-14);
    close.sort((a,b)=>b.pct-a.pct);
    const top=close.slice(0,3);
    if (top.length>0){
      ctx.fillStyle='rgba(255,255,255,0.25)'; ctx.font='500 10px system-ui'; ctx.textAlign='center';
      ctx.fillText('CLOSE TO UNLOCKING',W/2,H/2-16);
      top.forEach((item,i)=>{
        const cy=H/2+4+i*44;
        ctx.fillStyle='rgba(255,255,255,0.06)';
        ctx.beginPath(); ctx.roundRect(W/2-140,cy,280,36,6); ctx.fill();
        ctx.fillStyle='rgba(255,255,255,0.7)'; ctx.font='500 11px system-ui'; ctx.textAlign='left';
        ctx.fillText(item.ach.label,W/2-132,cy+13);
        ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.font='400 10px system-ui';
        ctx.fillText(item.ach.desc,W/2-132,cy+26);
        const bx=W/2-132,bw=200,bh=3,by=cy+32;
        ctx.fillStyle='rgba(255,255,255,0.1)';
        ctx.beginPath(); ctx.roundRect(bx,by,bw,bh,2); ctx.fill();
        ctx.fillStyle='#EF9F27';
        ctx.beginPath(); ctx.roundRect(bx,by,bw*item.pct,bh,2); ctx.fill();
        const dispCur=item.cur>=1000?(item.cur/1000).toFixed(1)+'K':item.cur;
        const dispGoal=item.goal>=1000?(item.goal/1000).toFixed(0)+'K':item.goal;
        ctx.fillStyle='rgba(255,255,255,0.35)'; ctx.font='400 9px system-ui'; ctx.textAlign='right';
        ctx.fillText(dispCur+' / '+dispGoal,W/2+140,by+3);
      });
    } else {
      ctx.fillStyle='#888780'; ctx.font='400 11px system-ui'; ctx.textAlign='center';
      ctx.fillText('visit the shop to spend your gems',W/2,H/2+10);
    }
  }

  if (homeConfirmPending){
    ctx.fillStyle='rgba(18,18,28,0.94)'; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#e8e8e4'; ctx.font='600 16px system-ui'; ctx.textAlign='center';
    ctx.fillText('Go to main menu?',W/2,H/2-50);
    ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font='400 12px system-ui';
    ctx.fillText('Gameplay will be lost.',W/2,H/2-24);
    ctx.fillStyle='#E24B4A';
    ctx.beginPath(); ctx.roundRect(W/2-116,H/2+4,104,38,9); ctx.fill();
    ctx.fillStyle='#fff'; ctx.font='600 13px system-ui';
    ctx.fillText('Yes, leave',W/2-64,H/2+28);
    ctx.fillStyle='rgba(255,255,255,0.12)';
    ctx.beginPath(); ctx.roundRect(W/2+12,H/2+4,104,38,9); ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.8)'; ctx.font='600 13px system-ui';
    ctx.fillText('Keep playing',W/2+64,H/2+28);
  }

  if (onboardingStep>=0) drawOnboarding();
  if (usernamePromptActive) drawUsernamePrompt();
  if (shakeX||shakeY) ctx.translate(-shakeX,-shakeY);
}

// ── Draw ad screen ────────────────────────────────────────────────────────────

function drawAdScreen() {
  ctx.fillStyle='rgba(18,18,28,0.94)'; ctx.fillRect(0,0,W,H);
  if (adScreen==='offer'){
    ctx.fillStyle='#F0997B'; ctx.font='600 20px system-ui'; ctx.textAlign='center'; ctx.fillText('out of balls!',W/2,H/2-80);
    ctx.fillStyle='#AFA9EC'; ctx.font='500 13px system-ui'; ctx.fillText('score: '+score,W/2,H/2-52);
    ctx.fillStyle='#e8e8e4'; ctx.font='400 12px system-ui';
    ctx.fillText('Watch a short ad to revive?',W/2,H/2-20);
    ctx.fillText("You'll get 3 balls back and keep your score.",W/2,H/2);
    ctx.fillStyle='#EF9F27'; ctx.beginPath(); ctx.roundRect(W/2-100,H/2+24,200,42,10); ctx.fill();
    ctx.fillStyle='#1a1a18'; ctx.font='600 14px system-ui'; ctx.fillText('▶  Watch Ad',W/2,H/2+50);
    ctx.fillStyle='#888780'; ctx.font='400 11px system-ui'; ctx.fillText('no thanks — end game',W/2,H/2+86);
  } else if (adScreen==='watching'){
    const progress=1-(adTimer/300);
    ctx.fillStyle='#e8e8e4'; ctx.font='600 16px system-ui'; ctx.textAlign='center'; ctx.fillText('watching ad...',W/2,H/2-40);
    ctx.fillStyle='#888780'; ctx.font='400 12px system-ui'; ctx.fillText(Math.ceil(adTimer/60)+'s remaining',W/2,H/2-14);
    ctx.fillStyle='rgba(255,255,255,0.1)'; ctx.beginPath(); ctx.roundRect(W/2-100,H/2+4,200,8,4); ctx.fill();
    ctx.fillStyle='#EF9F27'; ctx.beginPath(); ctx.roundRect(W/2-100,H/2+4,200*progress,8,4); ctx.fill();
    ctx.fillStyle='#888780'; ctx.font='400 10px system-ui'; ctx.fillText('please keep the app open',W/2,H/2+32);
  }
}

// ── Draw shop ─────────────────────────────────────────────────────────────────

function drawShop() {
  ctx.clearRect(0,0,W,H);
  const dk=dark();
  ctx.fillStyle=dk?'rgba(18,18,28,0.99)':'rgba(245,245,243,0.99)';
  ctx.beginPath(); ctx.roundRect(0,0,W,H,12); ctx.fill();

  ctx.fillStyle='rgba(255,255,255,0.08)';
  ctx.beginPath(); ctx.roundRect(12,12,80,30,8); ctx.fill();
  ctx.fillStyle=dk?'rgba(255,255,255,0.6)':'rgba(0,0,0,0.5)'; ctx.font='500 12px system-ui'; ctx.textAlign='center';
  ctx.fillText('← back',52,32);
  drawShop._backY=12; drawShop._backH=30;

  ctx.fillStyle='#EF9F27'; ctx.font='600 18px system-ui'; ctx.textAlign='center'; ctx.fillText('SHOP',W/2,36);
  ctx.fillStyle=dk?'#AFA9EC':'#7F77DD'; ctx.font='500 13px system-ui'; ctx.fillText('💎 '+gems+' gems',W/2,56);

  const sections=[{label:'Ball Colors',types:['theme']},{label:'Trails',types:['trail']},{label:'Ball Effects',types:['ballfx']},{label:'Boards',types:['board']}];
  let y=72-shopScroll; const itemH=52, pad=12;

  for (const sec of sections){
    const items=SHOP_ITEMS.filter(i=>sec.types.includes(i.type));
    if (y+20>60&&y<H-10){ctx.fillStyle='#888780';ctx.font='500 10px system-ui';ctx.textAlign='left';ctx.fillText(sec.label.toUpperCase(),pad,y+12);}
    y+=24;
    for (const item of items){
      if (y+itemH>60&&y<H-10){
        const owned_=isOwned(item.id),slot=item.type,equippedHere=equipped[slot]===item.id;
        ctx.fillStyle=equippedHere?(dk?'rgba(127,119,221,0.2)':'rgba(127,119,221,0.12)'):(dk?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.04)');
        ctx.beginPath(); ctx.roundRect(pad,y,W-pad*2,itemH-4,8); ctx.fill();
        if (equippedHere){ctx.strokeStyle='#7F77DD';ctx.lineWidth=1.5;ctx.beginPath();ctx.roundRect(pad,y,W-pad*2,itemH-4,8);ctx.stroke();}
        if (item.type==='theme'){ctx.beginPath();ctx.arc(pad+20,y+(itemH-4)/2,12,0,Math.PI*2);ctx.fillStyle=item.ball;ctx.fill();}
        else if (item.type==='board'){const sc={dark:'#18181C',neon:'#080818',minimal:'#F5F5F3'};ctx.fillStyle=sc[item.value]||'#888';ctx.beginPath();ctx.roundRect(pad+8,y+10,24,24,4);ctx.fill();ctx.strokeStyle=dk?'#666':'#ccc';ctx.lineWidth=1;ctx.stroke();}
        else{const pc={fire:'#FF4500',rainbow:'#7F77DD',glow:'#AFA9EC',pulse:'#EF9F27'};ctx.beginPath();ctx.arc(pad+20,y+(itemH-4)/2,10,0,Math.PI*2);ctx.fillStyle=pc[item.value]||'#888';ctx.fill();}
        ctx.fillStyle=dk?'#e8e8e4':'#1a1a18';ctx.font='500 13px system-ui';ctx.textAlign='left';ctx.fillText(item.label,pad+42,y+18);
        if (owned_){ctx.fillStyle=equippedHere?'#7F77DD':'#5DCAA5';ctx.font='500 11px system-ui';ctx.fillText(equippedHere?'equipped':'tap to equip',pad+42,y+34);}
        else{ctx.fillStyle=gems>=item.cost?'#EF9F27':'#888780';ctx.font='500 11px system-ui';ctx.fillText('💎 '+item.cost,pad+42,y+34);}
        item._y=y; item._h=itemH-4;
      }
      y+=itemH;
    }
    const excl=EXCLUSIVE_COSMETICS.filter(i=>sec.types.includes(i.type)&&isOwned(i.id));
    if (excl.length>0){
      if (y+20>60&&y<H-10){ctx.fillStyle='#EF9F27';ctx.font='500 9px system-ui';ctx.textAlign='left';ctx.fillText('EXCLUSIVE (ACHIEVEMENT UNLOCKS)',pad,y+10);}
      y+=20;
      for (const item of excl){
        if (y+itemH>60&&y<H-10){
          const slot=item.type,equippedHere=equipped[slot]===item.id;
          ctx.fillStyle=equippedHere?'rgba(239,159,39,0.18)':'rgba(255,255,255,0.04)';
          ctx.beginPath(); ctx.roundRect(pad,y,W-pad*2,itemH-4,8); ctx.fill();
          if (equippedHere){ctx.strokeStyle='#EF9F27';ctx.lineWidth=1.5;ctx.beginPath();ctx.roundRect(pad,y,W-pad*2,itemH-4,8);ctx.stroke();}
          if (item.type==='theme'){ctx.beginPath();ctx.arc(pad+20,y+(itemH-4)/2,12,0,Math.PI*2);ctx.fillStyle=item.ball;ctx.fill();}
          else{ctx.fillStyle='#EF9F27';ctx.font='16px system-ui';ctx.textAlign='center';ctx.fillText('✦',pad+20,y+(itemH-4)/2+6);}
          ctx.fillStyle='#EF9F27';ctx.font='500 13px system-ui';ctx.textAlign='left';ctx.fillText(item.label,pad+42,y+18);
          ctx.fillStyle=equippedHere?'#EF9F27':'#5DCAA5';ctx.font='500 11px system-ui';ctx.fillText(equippedHere?'equipped':'tap to equip',pad+42,y+34);
          item._y=y; item._h=itemH-4;
        }
        y+=itemH;
      }
    }
    y+=8;
  }
  // Seasonal owned
  const seasonalOwned_=loadSeasonalOwned();
  const ownedSeasonals=SEASONAL_EVENTS.filter(e=>seasonalOwned_.includes(e.id));
  if (ownedSeasonals.length>0){
    if (y+20>60&&y<H-10){ctx.fillStyle='#EF9F27';ctx.font='500 9px system-ui';ctx.textAlign='left';ctx.fillText('SEASONAL (FREE EVENT UNLOCKS)',pad,y+10);}
    y+=20;
    const equippedSeasonal=loadEquippedSeasonal();
    for (const ev of ownedSeasonals){
      if (y+itemH>60&&y<H-10){
        const isEq=equippedSeasonal===ev.id;
        ctx.fillStyle=isEq?'rgba(239,159,39,0.18)':'rgba(255,255,255,0.04)';
        ctx.beginPath(); ctx.roundRect(pad,y,W-pad*2,itemH-4,8); ctx.fill();
        if (isEq){ctx.strokeStyle='#EF9F27';ctx.lineWidth=1.5;ctx.beginPath();ctx.roundRect(pad,y,W-pad*2,itemH-4,8);ctx.stroke();}
        ctx.font='18px system-ui'; ctx.textAlign='center';
        ctx.fillText(ev.emoji,pad+20,y+(itemH-4)/2+6);
        ctx.fillStyle='#EF9F27';ctx.font='500 13px system-ui';ctx.textAlign='left';ctx.fillText(ev.name,pad+42,y+18);
        ctx.fillStyle=isEq?'#EF9F27':'#5DCAA5';ctx.font='500 11px system-ui';
        ctx.fillText(isEq?'equipped — tap to unequip':'tap to equip',pad+42,y+34);
        ev._shopY=y; ev._shopH=itemH-4;
      }
      y+=itemH;
    }
  }

  drawShop._totalH=y+shopScroll;
  if ((drawShop._totalH||0)>H+shopScroll){ctx.fillStyle='rgba(127,119,221,0.4)';ctx.font='400 11px system-ui';ctx.textAlign='center';ctx.fillText('scroll for more ↓',W/2,H-14);}
}

// ── Draw daily result ─────────────────────────────────────────────────────────

function drawDailyResult() {
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle='rgba(18,18,28,0.99)'; ctx.beginPath(); ctx.roundRect(0,0,W,H,12); ctx.fill();
  drawStarfield();
  ctx.fillStyle='#5DCAA5'; ctx.font='700 20px system-ui'; ctx.textAlign='center';
  ctx.fillText('📅 daily challenge',W/2,52);
  const d=new Date();
  ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.font='400 12px system-ui';
  ctx.fillText(d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'}),W/2,70);
  ctx.fillStyle='#fff'; ctx.font='700 48px system-ui';
  ctx.fillText(dailyResult.score.toLocaleString(),W/2,128);
  ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font='400 12px system-ui';
  ctx.fillText('round '+dailyResult.round,W/2,148);
  if (dailyResult.isNew){ctx.fillStyle='#EF9F27';ctx.font='600 12px system-ui';ctx.fillText('🏆 new personal best!',W/2,168);}
  else if (dailyResult.prev){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='400 11px system-ui';ctx.fillText('best: '+dailyResult.prev.score.toLocaleString(),W/2,168);}
  const title=getPlayerTitle();
  if (title){ctx.fillStyle='#EF9F27';ctx.font='600 10px system-ui';ctx.fillText('✦ '+title+' ✦',W/2,184);}

  // Tier row
  const tierY=194;
  ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='500 8px system-ui'; ctx.textAlign='center';
  ctx.fillText('DAILY REWARD TIERS',W/2,tierY);
  DAILY_TIERS.slice().reverse().forEach((tier,i)=>{
    const tx=W/2-165+i*68,ty=tierY+6,tw=62,th=36;
    const hit=dailyResult.score>=tier.pts;
    ctx.fillStyle=hit?'rgba(93,202,165,0.2)':'rgba(255,255,255,0.04)';
    ctx.beginPath(); ctx.roundRect(tx,ty,tw,th,6); ctx.fill();
    if (hit){ctx.strokeStyle='#5DCAA5';ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(tx,ty,tw,th,6);ctx.stroke();}
    ctx.fillStyle=hit?'#5DCAA5':'rgba(255,255,255,0.3)';
    ctx.font='600 9px system-ui'; ctx.textAlign='center';
    ctx.fillText(tier.label,tx+tw/2,ty+13);
    ctx.fillStyle=hit?'#EF9F27':'rgba(255,255,255,0.25)';
    ctx.font='500 9px system-ui';
    ctx.fillText('+'+tier.gems+' 💎',tx+tw/2,ty+26);
  });

  // Reward banner
  const claimedY=tierY+48;
  if (dailyResult.claimedTier){
    ctx.fillStyle='rgba(93,202,165,0.15)';
    ctx.beginPath(); ctx.roundRect(W/2-140,claimedY,280,32,8); ctx.fill();
    ctx.strokeStyle='#5DCAA5'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.roundRect(W/2-140,claimedY,280,32,8); ctx.stroke();
    ctx.fillStyle='#5DCAA5'; ctx.font='600 12px system-ui'; ctx.textAlign='center';
    ctx.fillText('🎉 '+dailyResult.claimedTier.label+'! +'+dailyResult.claimedTier.gems+' gems claimed',W/2,claimedY+21);
  } else if (dailyResult.alreadyClaimed){
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font='400 10px system-ui'; ctx.textAlign='center';
    ctx.fillText('reward already claimed today',W/2,claimedY+16);
  } else {
    ctx.fillStyle='rgba(255,255,255,0.25)'; ctx.font='400 10px system-ui'; ctx.textAlign='center';
    ctx.fillText('score 500+ to earn gems',W/2,claimedY+16);
  }

  // Score card
  const cardY=claimedY+40;
  ctx.fillStyle='rgba(127,119,221,0.15)'; ctx.beginPath(); ctx.roundRect(W/2-125,cardY,250,58,10); ctx.fill();
  ctx.strokeStyle='rgba(127,119,221,0.4)'; ctx.lineWidth=1; ctx.beginPath(); ctx.roundRect(W/2-125,cardY,250,58,10); ctx.stroke();
  ctx.fillStyle='#AFA9EC'; ctx.font='500 10px system-ui'; ctx.textAlign='center';
  ctx.fillText('DROPZONE — Daily Challenge',W/2,cardY+15);
  ctx.fillStyle='#fff'; ctx.font='600 11px system-ui';
  ctx.fillText(d.toLocaleDateString('en-US',{month:'short',day:'numeric'})+(title?' ['+title+']':'')+' · '+dailyResult.score.toLocaleString()+' · R'+dailyResult.round,W/2,cardY+31);
  ctx.fillStyle='rgba(255,255,255,0.35)'; ctx.font='400 9px system-ui';
  ctx.fillText('Can you beat it? 🎯',W/2,cardY+46);

  // Buttons — store y values for tap detection
  const copyY=cardY+66;
  const backY=copyY+42;
  ctx.fillStyle='#7F77DD'; ctx.beginPath(); ctx.roundRect(W/2-75,copyY,150,32,9); ctx.fill();
  ctx.fillStyle='#fff'; ctx.font='600 11px system-ui'; ctx.textAlign='center';
  ctx.fillText('📋 copy score card',W/2,copyY+21);
  ctx.fillStyle='rgba(255,255,255,0.08)'; ctx.beginPath(); ctx.roundRect(W/2-75,backY,150,30,9); ctx.fill();
  ctx.fillStyle='rgba(255,255,255,0.6)'; ctx.font='500 11px system-ui';
  ctx.fillText('← back to menu',W/2,backY+20);
  drawDailyResult._copyY=copyY; drawDailyResult._backY=backY;
}

// ── Loop ──────────────────────────────────────────────────────────────────────

function loop() {
  if (screen==='launch') { drawLaunch(); launchAnimT+=0.02; }
  else if (screen==='settings')     { drawSettings(); }
  else if (screen==='achievements') { drawAchievements(); }
  else if (screen==='shop')         { drawShop(); }
  else if (screen==='leaderboard')  { drawLeaderboard(); }
  else if (screen==='daily_result') { drawDailyResult(); }
  else {
    if (!gameOver||balls.some(b=>b.active)) update();
    if (adScreen){
      drawGame(); drawAdScreen();
      if (adScreen==='watching'){adTimer--;if(adTimer<=0){adUsed=true;adScreen=false;adRoundAtRevive=round;ballsLeft=3;multiplier=1;SFX.roundUp();setMsg('revived! 3 balls restored — click to drop');updateHUD();}}
    } else { drawGame(); }
  }
  requestAnimationFrame(loop);
}

// ── Input helpers ─────────────────────────────────────────────────────────────

function getGameY(clientY) { const r=gc.getBoundingClientRect(); return (clientY-r.top)/(r.width/W); }

function handleTap(gy, clientX) {
  if (usernamePromptActive) {
    const cx=clientToGame(clientX||0);
    if (gy>=H/2+42&&gy<=H/2+74&&cx<W/2) {
      username=usernameInput.trim().slice(0,16)||generateUsername();
      saveUsername(username);
      const scores=loadScores();
      if (scores.length>0){scores[0].name=username;saveScores(scores);}
      usernamePromptActive=false;
      return;
    }
    if (gy>=H/2+42&&gy<=H/2+74&&cx>=W/2) {
      if (!username) username=generateUsername();
      saveUsername(username);
      usernamePromptActive=false;
      return;
    }
    return;
  }
  if (screen==='launch')        { launchTap(gy); return; }
  if (screen==='settings')      { settingsTap(gy); return; }
  if (screen==='achievements')  { if (gy>=12&&gy<=42){screen='launch';syncHUD();} return; }
  if (screen==='leaderboard')   { leaderboardTap(gy); return; }
  if (screen==='daily_result')  { dailyResultTap(gy); return; }
  if (screen==='shop')          { shopTap(gy); return; }
  if (adScreen==='offer') {
    if (gy>=H/2+24&&gy<=H/2+66){adScreen='watching';adTimer=300;}
    else if (gy>=H/2+74&&gy<=H/2+96){adScreen=false;triggerGameOver();}
    return;
  }
  if (adScreen==='watching') return;
  if (onboardingStep>=0) {
    if (onboardingStep<3){onboardingStep++;}
    else{onboardingStep=-1;isOnboarding=false;onboardingDone=true;LS.set('dz_onboard',true);}
    return;
  }
  if (usernamePromptActive) {
    const saveY=H/2+42, skipY=H/2+42, bh=32;
    const cx=clientToGame(clientX||0);
    // Save button (left half)
    if (gy>=H/2+42&&gy<=H/2+74&&cx<W/2) {
      username=usernameInput.trim().slice(0,16)||generateUsername();
      saveUsername(username);
      const scores=loadScores();
      if (scores.length>0){scores[0].name=username;saveScores(scores);}
      usernamePromptActive=false;
      return;
    }
    // Skip button (right half)
    if (gy>=H/2+42&&gy<=H/2+74&&cx>=W/2) {
      if (!username) username=generateUsername();
      saveUsername(username);
      return;
    }
    return;
  }
  if (homeConfirmPending) {
    if (gy>=H/2+4&&gy<=H/2+42) {
      if (clientToGame(clientX||0)<W/2) {
        homeConfirmPending=false; screen='launch'; syncHUD();
      } else {
        homeConfirmPending=false;
      }
    }
    return;
  }
  if (gameOver||dropping||ballsLeft<=0) return;
  ballsLeft--; updateHUD();
  spawnBalls(clientX!==undefined?clientToGame(clientX):W/2);
}

// ── Screen taps ───────────────────────────────────────────────────────────────

function launchTap(gy) {
  // Handle picker overlay
  if (seasonalPickerOpen) {
    const evs=drawSeasonalPicker._activeEvs||[];
    const closeY=drawSeasonalPicker._closeY||450;
    if (gy>=closeY&&gy<=closeY+32){seasonalPickerOpen=false;return;}
    for (const ev of evs) {
      if (ev._pickerY!=null&&gy>=ev._pickerY&&gy<=ev._pickerY+ev._pickerH){
        const owned_=loadSeasonalOwned();
        const cur=loadEquippedSeasonal();
        if (cur===ev.id){saveEquippedSeasonal(null);}
        else {
          if (!owned_.includes(ev.id)){owned_.push(ev.id);saveSeasonalOwned(owned_);}
          saveEquippedSeasonal(ev.id);
        }
        seasonalPickerOpen=false;
        return;
      }
    }
    return;
  }

  const banner=drawLaunch._seasonalBanner;
  if (banner&&gy>=banner.y&&gy<=banner.y+banner.h) {
    seasonalPickerOpen=true;
    return;
  }
  const btns=drawLaunch._btns||[];
  for (const btn of btns) {
    if (gy>=btn._y&&gy<=btn._y+btn._h) {
      SFX.launch(); haptic(10);
      if (btn.label.includes('PLAY'))        { startGame(false); return; }
      if (btn.label.includes('Daily')) { if (!isDailyDone()) startGame(true); return; }
      if (btn.label.includes('Achievement')) { screen='achievements'; achieveScroll=0; syncHUD(); return; }
      if (btn.label.includes('My Scores')) { screen='leaderboard'; leaderboardTab='all'; syncHUD(); return; }
      if (btn.label.includes('Shop'))        {
        screen='shop'; shopScroll=0; syncHUD();
        const s=loadStats(); s.shopVisits=(s.shopVisits||0)+1; saveStats(s);
        return;
      }
      if (btn.label.includes('Settings'))    { screen='settings'; syncHUD(); return; }
    }
  }
}

function settingsTap(gy) {
  if (gy>=12&&gy<=42){screen='launch';syncHUD();return;}
  const items=drawSettings._items||[];
  for (const item of items) {
    if (item._y!=null&&gy>=item._y&&gy<=item._y+item._h) {
      if (item.type==='toggle') {
        if (item.id==='sound'){soundEnabled=!soundEnabled;LS.set('dz_sound',soundEnabled);}
        if (item.id==='vibe') {vibrationEnabled=!vibrationEnabled;LS.set('dz_vibe',vibrationEnabled);}
      } else if (item.type==='button'&&item.id==='username') {
        usernamePromptActive=true; usernameInput=username||'';
      }
      return;
    }
  }
}

function leaderboardTap(gy) {
  if (gy>=12&&gy<=42){screen='launch';syncHUD();return;}
  const tabs=drawLeaderboard._tabs||[];
  for (const tab of tabs) {
    if (gy>=tab._y&&gy<=tab._y+tab._h){leaderboardTab=tab.id;return;}
  }
}

function shopTap(gameY) {
  if (gameY>=12&&gameY<=42){screen='launch';syncHUD();return;}
  // Check seasonal items
  const seasonalOwned_=loadSeasonalOwned();
  const ownedSeasonals=SEASONAL_EVENTS.filter(e=>seasonalOwned_.includes(e.id));
  for (const ev of ownedSeasonals){
    if (ev._shopY!=null&&gameY>=ev._shopY&&gameY<=ev._shopY+ev._shopH){
      const cur=loadEquippedSeasonal();
      saveEquippedSeasonal(cur===ev.id?null:ev.id);
      return;
    }
  }
  const all=[...SHOP_ITEMS,...EXCLUSIVE_COSMETICS];
  for (const item of all) {
    if (item._y==null) continue;
    if (gameY>=item._y&&gameY<=item._y+item._h) {
      const slot=item.type;
      if (isOwned(item.id)){
        equipped[slot]=equipped[slot]===item.id?undefined:item.id;
        saveEquipped(equipped);
      } else if (SHOP_ITEMS.includes(item)&&gems>=item.cost){
        gems-=item.cost; saveGems(gems); owned.push(item.id); saveOwned(owned);
        equipped[slot]=item.id; saveEquipped(equipped); SFX.gem(); haptic(15);
        const s=loadStats(); s.shopItemsBought=(s.shopItemsBought||0)+1; saveStats(s);
        checkAchievements();
      }
      return;
    }
  }
}

function dailyResultTap(gy) {
  const copyY=drawDailyResult._copyY||380;
  const backY=drawDailyResult._backY||422;
  if (gy>=copyY&&gy<=copyY+32) {
    const d=new Date(), title=getPlayerTitle();
    const txt=`DROPZONE Daily Challenge\n${d.toLocaleDateString('en-US',{month:'short',day:'numeric'})}${title?' ['+title+']':''} · Score: ${dailyResult.score.toLocaleString()} · Round ${dailyResult.round}\nCan you beat it? 🎯`;
    try{navigator.clipboard.writeText(txt);}catch{}
    addPopup(W/2,H/2,'copied!','#5DCAA5'); return;
  }
  if (gy>=backY&&gy<=backY+30){screen='launch';syncHUD();}
}

// ── Input listeners ───────────────────────────────────────────────────────────

gc.addEventListener('mousemove',e=>{if(screen!=='game')return;aimX=clientToGame(e.clientX);});
gc.addEventListener('mouseleave',()=>{aimX=-1;});
gc.addEventListener('click',e=>{handleTap(getGameY(e.clientY),e.clientX);});
gc.addEventListener('wheel',e=>{
  if (screen==='shop'){shopScroll=Math.max(0,Math.min(shopScroll+e.deltaY*0.5,Math.max(0,(drawShop._totalH||0)-H+20)));}
  if (screen==='achievements'){achieveScroll=Math.max(0,Math.min(achieveScroll+e.deltaY*0.5,Math.max(0,(drawAchievements._totalH||0)-H+20)));}
},{passive:true});
gc.addEventListener('touchmove',e=>{
  if (screen==='game'){e.preventDefault();aimX=clientToGame(e.touches[0].clientX);}
},{passive:false});
gc.addEventListener('touchend',e=>{
  e.preventDefault();
  handleTap(getGameY(e.changedTouches[0].clientY),e.changedTouches[0].clientX);
},{passive:false});

document.getElementById('rbtn').addEventListener('click',()=>{
  screen='launch'; soundEnabled=LS.get('dz_sound',true); vibrationEnabled=LS.get('dz_vibe',true);
  syncHUD();
});

window.addEventListener('keydown',e=>{
  if (!usernamePromptActive) return;
  if (e.key==='Enter'){
    username=usernameInput.trim().slice(0,16)||generateUsername();
    saveUsername(username);
    const scores=loadScores();
    if (scores.length>0){scores[0].name=username;saveScores(scores);}
    usernamePromptActive=false; return;
  }
  if (e.key==='Backspace'){usernameInput=usernameInput.slice(0,-1);return;}
  if (e.key.length===1&&usernameInput.length<16){usernameInput+=e.key;}
});

// ── Shop + Home buttons ───────────────────────────────────────────────────────

function buildShopButton() {
  let hbtn=document.getElementById('home-btn');
  if (!hbtn){
    hbtn=document.createElement('button');
    hbtn.id='home-btn';
    hbtn.style.cssText='padding:5px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.5);font-size:12px;cursor:pointer;font-family:inherit;margin-bottom:6px;margin-right:6px;';
    hbtn.textContent='⌂ menu';
    document.getElementById('button-row').appendChild(hbtn);
  }
  hbtn.onclick=()=>{
    if (screen==='game'){homeConfirmPending=true;}
  };

  let btn=document.getElementById('shop-btn');
  if (!btn){
    btn=document.createElement('button');
    btn.id='shop-btn';
    btn.style.cssText='padding:5px 14px;border-radius:8px;border:1px solid rgba(127,119,221,0.4);background:rgba(127,119,221,0.12);color:#7F77DD;font-size:12px;cursor:pointer;font-family:inherit;margin-bottom:6px;';
    document.getElementById('button-row').appendChild(btn);
  }
  btn.textContent=isDailyMode?'📅 daily':'💎 '+gems;
  btn.onclick=()=>{
    if (screen==='game'||screen==='shop'){
      screen=screen==='shop'?'game':'shop'; shopScroll=0;
      if (screen==='shop'){const s=loadStats();s.shopVisits=(s.shopVisits||0)+1;saveStats(s);}
      syncHUD();
      btn.textContent=screen==='shop'?'← back':(isDailyMode?'📅 daily':'💎 '+gems);
      btn.style.color=screen==='shop'?'#5DCAA5':'#7F77DD';
    }
  };
}

// ── syncHUD ───────────────────────────────────────────────────────────────────

function syncHUD() {
  const isGame=screen==='game';
  document.getElementById('hud').style.display  =isGame?'flex' :'none';
  document.getElementById('bars').style.display =isGame?'flex' :'none';
  document.getElementById('msg').style.display  =isGame?'block':'none';
  document.getElementById('rbtn').style.display ='none';
  const sb=document.getElementById('shop-btn');
  if (sb) sb.style.display=isGame?'inline-block':'none';
  const hb=document.getElementById('home-btn');
  if (hb) hb.style.display=isGame?'inline-block':'none';
}

// ── Start game ────────────────────────────────────────────────────────────────

function startGame(daily) {
  isDailyMode=daily; dailyRng=daily?seededRng(todaySeed()):null;
  screen='game';
  score=0; best=loadBest(); gems=loadGems(); owned=loadOwned();
  equipped=loadEquipped(); achieved=loadAchieved();
  ballsLeft=3; gameOver=false; dropping=false; round=1; multiplier=1;
  pendingBalls=1; shieldActive=false; pendingRoundAdvance=false;
  unlockedPowerups=[]; balls=[]; particles=[]; popups=[];
  obstacles=[]; bonusSlots=[]; deathSlots=[]; tokens=[];
  aimX=-1; newUnlockMsg=null; newUnlockTimer=0;
  newAchievMsg=null; newAchievTimer=0; newAchievDesc=null;
  adUsed=false; adScreen=false; adTimer=0; homeConfirmPending=false; dailyResult=null;
  gameMaxMulti=0; gameDeathHits=0; roundPerfect=true;
  adRoundAtRevive=0; postReviveRounds=0;
  gamePegsHit=0; gameHundredSlot=0;
  gameStartTime=Date.now();
  consecutiveRoundsNoDeath=0; currentRoundNoDeath=true;
  tokensThisDrop=0; shakeTimer=0; shakeX=0; shakeY=0;
  roundFlashTimer=0; roundFlashNum=0;
  isOnboarding=false; onboardingStep=-1;
  if (!onboardingDone){isOnboarding=true;onboardingStep=0;}

  if (daily){const s=loadStats();s.dailyChallengesPlayed=(s.dailyChallengesPlayed||0)+1;saveStats(s);}

  document.getElementById('rbtn').style.display='none';
  const sb=document.getElementById('shop-btn');
  if (sb){sb.textContent=isDailyMode?'📅 daily':'💎 '+gems;sb.style.color=isDailyMode?'#5DCAA5':'#7F77DD';}
  syncHUD();
  setMsg('aim and click to drop');
  buildBoard(); updateHUD(); resizeCanvas();
  checkAchievements();
}

// ── Standalone functions ──────────────────────────────────────────────────────

function triggerShake(intensity=6, duration=12) {
  shakeTimer=duration; shakeX=intensity; shakeY=intensity;
}

// ── Init ──────────────────────────────────────────────────────────────────────

function init() {
  best=loadBest(); gems=loadGems(); owned=loadOwned();
  equipped=loadEquipped(); achieved=loadAchieved();
  soundEnabled=loadSoundPref(); vibrationEnabled=loadVibePref();
  onboardingDone=loadOnboarding();
  username=loadUsername();
  screen='launch'; launchAnimT=0;
  buildStarfield();
  buildShopButton();
  resizeCanvas();
  syncHUD();
  requestAnimationFrame(loop);
}

window.addEventListener('resize',()=>{resizeCanvas();});
init();