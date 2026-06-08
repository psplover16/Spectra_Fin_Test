import type {
  ContentStage,
  QuestionMapping,
  SourceReference,
  SubjectContent,
  SubjectSlug,
  SynthesisBatch,
  YearlySource
} from '@/modules/exam/types/content';

const stageOneFolder = '_private/計算機原理、網路概論';
const stageTwoFolder = '_private/資訊管理、程式設計';
const stageThreeFolder = '_private/國文、英文';

const computerNetworkFiles = [
  '107國營事業新進職員-計算機原理、網路概論.pdf',
  '108國營事業新進職員-計算機原理、網路概論.pdf',
  '109國營事業新進職員-計算機原理 網路概論.pdf',
  '110國營事業新進職員-計算機原理、網路概論.pdf',
  '111國營事業新進職員-計算機原理、網路概論.pdf',
  '112國營事業新進職員(資訊)-計算機原理、網路概論.pdf',
  '113國營事業新進職員(資訊)計算機原理、網路概論.pdf',
  '114年度新進職員甄試試題科目A_資訊_計算機原理網路概論.pdf'
] as const;

const managementProgrammingFiles = [
  '107國營事業新進職員-資訊管理.程式設計.pdf',
  '108國營事業新進職員-資訊管理、程式設計.pdf',
  '109國營事業新進職員-資訊管理、程式設計.pdf',
  '110國營事業新進職員-資訊管理、程式設計.pdf',
  '111國營事業新進職員-資訊管理、程式設計.pdf',
  '112國營事業新進職員-資訊管理、程式設計.pdf',
  '113國營事業新進職員-資訊管理、程式設計.pdf',
  '114國營事業新進職員-資訊管理、程式設計.pdf'
] as const;

const languageFiles = [
  '107國營事業新進職員-國文、英文.pdf',
  '108國營事業新進職員-共同科目(國文、英文).pdf',
  '109國營事業新進職員-國文、英文.pdf',
  '110國營事業新進職員-國文、英文.pdf',
  '111國營事業新進職員-國文、英文.pdf',
  '112國營事業新進職員-國文、英文.pdf'
] as const;

function yearFromFile(sourceFile: string): string {
  return sourceFile.slice(0, 3);
}

function sourceRef(sourceFolder: string, sourceFile: string): SourceReference {
  return {
    sourceFolder,
    sourceFile,
    sourceYear: yearFromFile(sourceFile),
    verificationStatus: 'needs-review'
  };
}

function yearlySources(sourceFolder: string, sourceFiles: readonly string[], subjects: string[]): YearlySource[] {
  return sourceFiles.map((sourceFile) => ({
    ...sourceRef(sourceFolder, sourceFile),
    label: `${yearFromFile(sourceFile)} 年來源卷`,
    subjects
  }));
}

function synthesisBatches(
  stage: ContentStage,
  subject: string,
  sourceFiles: readonly string[],
  consolidationSummary: string
): SynthesisBatch[] {
  return [
    ...sourceFiles.map((sourceFile) => ({
      id: `stage-${stage}-${subject}-${yearFromFile(sourceFile)}-source-agent`,
      stage,
      owner: 'subagent',
      sourceFiles: [sourceFile],
      outputSummary: `${yearFromFile(sourceFile)} 年來源檔已分派為獨立副代理工作項，輸出摘要、考點、重點、題目對照與待校對事項。`,
      verificationStatus: 'needs-review' as const
    })),
    {
      id: `stage-${stage}-${subject}-consolidation-agent`,
      stage,
      owner: 'consolidation-subagent',
      sourceFiles: [...sourceFiles],
      outputSummary: consolidationSummary,
      verificationStatus: 'needs-review'
    }
  ];
}

function mapping(overrides: Omit<QuestionMapping, 'kind' | 'verificationStatus'>): QuestionMapping {
  return {
    kind: 'topic-mapping',
    verificationStatus: 'needs-review',
    ...overrides
  };
}

const firstComputerSource = sourceRef(stageOneFolder, computerNetworkFiles[0]);
const firstNetworkingSource = sourceRef(stageOneFolder, computerNetworkFiles[1]);
const firstManagementSource = sourceRef(stageTwoFolder, managementProgrammingFiles[0]);
const firstProgrammingSource = sourceRef(stageTwoFolder, managementProgrammingFiles[1]);
const firstLanguageSource = sourceRef(stageThreeFolder, languageFiles[0]);

export const subjectContents: SubjectContent[] = [
  {
    id: 'computer-principles',
    title: '計算機原理',
    routePath: '/computer-principles',
    category: 'professional',
    stage: 1,
    sourceFolders: [stageOneFolder],
    overview:
      '計算機原理以資料表示、數位邏輯、記憶體階層、作業系統與硬體架構為主軸，整理近年資訊類科試題中反覆出現的基本定義、運算規則與系統運作觀念。',
    highFrequencyPoints: [
      {
        id: 'computer-data-representation',
        title: '資料表示與進位轉換',
        summary: '二進位、十六進位、補數、字元編碼與位元運算常被用來檢查基礎運算觀念。',
        sourceRefs: [firstComputerSource]
      },
      {
        id: 'computer-os-memory',
        title: '作業系統與記憶體管理',
        summary: '行程、執行緒、排程、分頁、快取與虛擬記憶體是系統題最容易混淆的區塊。',
        sourceRefs: [sourceRef(stageOneFolder, computerNetworkFiles[3])]
      },
      {
        id: 'computer-architecture-performance',
        title: 'CPU、匯流排與效能計算',
        summary: '時脈週期、指令時間、位址線、匯流排頻寬、CISC/Pipeline、RAID、SAN、SMP 與 Amdahl’s Law 反覆出現。',
        sourceRefs: [
          sourceRef(stageOneFolder, computerNetworkFiles[1]),
          sourceRef(stageOneFolder, computerNetworkFiles[3])
        ]
      },
      {
        id: 'computer-algorithms-structures',
        title: '資料結構、演算法與程式語言',
        summary: '排序、搜尋、二元樹、Stack、Hash、遞迴與 C/Java/Python 執行結果常以逐步追蹤考驗觀念。',
        sourceRefs: [
          sourceRef(stageOneFolder, computerNetworkFiles[2]),
          sourceRef(stageOneFolder, computerNetworkFiles[4]),
          sourceRef(stageOneFolder, computerNetworkFiles[5])
        ]
      },
      {
        id: 'computer-database-ai-media',
        title: '資料庫、AI、雲端與多媒體',
        summary: 'SQL、正規化、NoSQL、ERP、IaaS、IoT、PCA/RNN/NLP、圖檔格式與透明影像題逐年混入。',
        sourceRefs: [
          sourceRef(stageOneFolder, computerNetworkFiles[1]),
          sourceRef(stageOneFolder, computerNetworkFiles[5])
        ]
      }
    ],
    yearlySources: yearlySources(stageOneFolder, computerNetworkFiles, ['計算機原理', '網路概論']),
    lectureSections: [
      {
        id: 'computer-representation-lecture',
        title: '資料表示先抓位元意義',
        body:
          '解計算機原理題時，先確認題目談的是數值、字元、邏輯位元還是儲存單位。補數題要分清楚表示範圍與實際值，位元運算題要先對齊位元位置，再判斷 AND、OR、XOR 或 shift 對結果的影響。',
        keyPoints: ['補數表示範圍', '位元運算', '字元與儲存單位'],
        sourceRefs: [firstComputerSource]
      },
      {
        id: 'computer-system-lecture',
        title: '系統結構用資料流理解',
        body:
          'CPU、記憶體、I/O 與作業系統題目通常不是背名詞，而是問資源如何被分配與保護。可用「誰提出需求、誰排程、資料放在哪、失敗時誰處理」四個問題串起行程管理、記憶體管理與中斷處理。',
        keyPoints: ['CPU 與 I/O 分工', '行程排程', '快取與分頁'],
        sourceRefs: [sourceRef(stageOneFolder, computerNetworkFiles[4])]
      },
      {
        id: 'computer-performance-storage-lecture',
        title: '效能與儲存題用公式前先抓單位',
        body:
          '位址線、快取命中率、Amdahl’s Law、匯流排頻寬、RAID 容量與磁碟排程都是容易算錯的題型。先把容量、時間、頻率、位元與位元組單位整理清楚，再決定使用平均存取時間、加速比或可用容量公式。',
        keyPoints: ['快取平均存取時間', 'Amdahl’s Law', 'RAID 與儲存容量'],
        sourceRefs: [
          sourceRef(stageOneFolder, computerNetworkFiles[1]),
          sourceRef(stageOneFolder, computerNetworkFiles[3])
        ]
      },
      {
        id: 'computer-algorithm-programming-lecture',
        title: '演算法與程式題要分成追蹤與分類',
        body:
          '排序、搜尋、樹走訪與 Stack 題可先分類資料結構，再追蹤每一步狀態。C、Java、Python 題則先確認型別、參數傳遞、遞迴終止、溢位或副作用，避免把語法記憶誤當成執行結果。',
        keyPoints: ['排序搜尋複雜度', '樹與 Stack', 'C/Java/Python 執行結果'],
        sourceRefs: [
          sourceRef(stageOneFolder, computerNetworkFiles[4]),
          sourceRef(stageOneFolder, computerNetworkFiles[5])
        ]
      }
    ],
    reviewChecklist: [
      '能手算進位、補數、BCD 與位元 OR/XOR',
      '能區分行程、執行緒、排程、deadlock 與 system call',
      '能說明快取、主記憶體、SAN、RAID 與輔助儲存差異',
      '能追蹤排序、搜尋、二元樹、Stack 與遞迴題',
      '能把 SQL/正規化/NoSQL/ERP 與 AI/雲端/IoT 題放回正確分類'
    ],
    pitfalls: [
      {
        title: '把位元數與可表示數量混在一起',
        explanation: 'n 個位元可表示 2^n 種狀態，但有號數範圍需扣除符號與補數規則，不能直接等同於無號數。',
        sourceRefs: [firstComputerSource]
      },
      {
        title: '把排程、分頁與快取題都當成背誦題',
        explanation: '這些題目常給數字或執行序列，需依演算法逐步計算，特別注意 SJF、Round-Robin、LRU 與 Belady anomaly。',
        sourceRefs: [
          sourceRef(stageOneFolder, computerNetworkFiles[1]),
          sourceRef(stageOneFolder, computerNetworkFiles[5])
        ]
      }
    ],
    questionMappings: [
      mapping({
        subject: '計算機原理',
        examPointId: 'computer-data-representation',
        difficulty: 'basic',
        questionType: 'concept-check',
        questionStem: '若題目要求判斷二補數表示範圍，解題第一步應先確認哪一件事？',
        options: ['位元數', '網路層協定', '資料庫正規化', '專案時程'],
        correctAnswer: 'A',
        optionExplanations: ['位元數決定補數表示範圍。', '網路層協定屬於網路概論。', '資料庫正規化屬於資訊管理。', '專案時程屬於管理議題。'],
        lectureSectionId: 'computer-representation-lecture',
        sourceRef: firstComputerSource
      }),
      mapping({
        subject: '計算機原理',
        examPointId: 'computer-architecture-performance',
        difficulty: 'intermediate',
        questionType: 'calculation-check',
        questionStem: '快取命中率、位址線或 Amdahl’s Law 題出現時，最需要先整理哪件事？',
        options: ['單位與公式適用條件', 'OSI 應用層協定', '國文段落主旨', 'CRM 顧客流程'],
        correctAnswer: 'A',
        optionExplanations: [
          '效能與容量題常因時間、頻率、位元與位元組單位混用而誤判。',
          'OSI 應用層協定屬於網路概論。',
          '段落主旨屬於共同科目語言。',
          'CRM 屬於資訊管理。'
        ],
        lectureSectionId: 'computer-performance-storage-lecture',
        sourceRef: sourceRef(stageOneFolder, computerNetworkFiles[1])
      }),
      mapping({
        subject: '計算機原理',
        examPointId: 'computer-algorithms-structures',
        difficulty: 'intermediate',
        questionType: 'trace-check',
        questionStem: '二元樹、Stack、排序或遞迴題的共同解題策略是什麼？',
        options: ['先分類結構再逐步追蹤狀態', '直接套用路由協定距離', '只背資訊系統縮寫', '只看英文單字長度'],
        correctAnswer: 'A',
        optionExplanations: [
          '資料結構與程式題需要逐步追蹤狀態與操作順序。',
          '路由距離屬於網路概論。',
          '資訊系統縮寫屬於資訊管理。',
          '單字長度不是語言題可靠線索。'
        ],
        lectureSectionId: 'computer-algorithm-programming-lecture',
        sourceRef: sourceRef(stageOneFolder, computerNetworkFiles[4])
      })
    ],
    synthesisBatches: synthesisBatches(1, 'computer-principles', computerNetworkFiles, '計算機原理整併工作項彙整所有年度來源，統一資料表示、系統結構與作業系統考點。')
  },
  {
    id: 'networking',
    title: '網路概論',
    routePath: '/networking',
    category: 'professional',
    stage: 1,
    sourceFolders: [stageOneFolder],
    overview:
      '網路概論以 OSI/TCP-IP 分層、IP 位址、路由交換、常見協定、網路服務與資安基礎為主，重點是能把協定功能放回正確層級並判斷題目情境中的設備與安全風險。',
    highFrequencyPoints: [
      {
        id: 'network-layering',
        title: 'OSI 與 TCP/IP 分層',
        summary: '常考各層設備、協定、封裝單位與服務功能的對應。',
        sourceRefs: [firstNetworkingSource]
      },
      {
        id: 'network-addressing',
        title: 'IP 位址與子網路',
        summary: '位址範圍、遮罩、私有位址與路由判斷是網路計算題核心。',
        sourceRefs: [sourceRef(stageOneFolder, computerNetworkFiles[5])]
      },
      {
        id: 'network-protocol-services',
        title: 'TCP/UDP、路由與服務協定',
        summary: 'ARP、ICMP、DHCP、DNS、SMTP、FTP、LDAP、SNMP、OSPF、BGP 與 tracert 常以功能辨識出題。',
        sourceRefs: [
          sourceRef(stageOneFolder, computerNetworkFiles[1]),
          sourceRef(stageOneFolder, computerNetworkFiles[4]),
          sourceRef(stageOneFolder, computerNetworkFiles[5])
        ]
      },
      {
        id: 'network-security-wireless',
        title: '網路安全、無線與 IoT',
        summary: 'SSL/TLS、VPN、IPsec、IDS/IDPS、OWASP、STRIDE、WAF、MFA、Session Hijacking、Wi-Fi 安全、ZigBee、Bluetooth 與 IoT 分層都是高密度考點。',
        sourceRefs: [
          sourceRef(stageOneFolder, computerNetworkFiles[0]),
          sourceRef(stageOneFolder, computerNetworkFiles[4]),
          sourceRef(stageOneFolder, computerNetworkFiles[5])
        ]
      }
    ],
    yearlySources: yearlySources(stageOneFolder, computerNetworkFiles, ['計算機原理', '網路概論']),
    lectureSections: [
      {
        id: 'network-layer-lecture',
        title: '先用分層定位問題',
        body:
          '網路題先判斷題目描述的是實體傳輸、資料鏈結、網路層路由、傳輸層可靠性，還是應用層服務。把設備與協定放回正確層級後，選項中的錯誤通常會變成層級錯置或功能誤配，再搭配封包、位址與連線特性確認答案。',
        keyPoints: ['OSI 分層', 'TCP/IP 對照', '設備與協定功能'],
        sourceRefs: [firstNetworkingSource]
      },
      {
        id: 'network-security-lecture',
        title: '服務與安全用用途判斷',
        body:
          'DNS、DHCP、HTTP、TLS、VPN、防火牆與 NAT 常被放在情境題中比較。解題時要區分名稱解析、位址分配、傳輸加密、存取控管與位址轉換，避免只憑關鍵字選答案。',
        keyPoints: ['DNS/DHCP', 'TLS/VPN', '防火牆與 NAT'],
        sourceRefs: [sourceRef(stageOneFolder, computerNetworkFiles[6])]
      },
      {
        id: 'network-address-routing-lecture',
        title: 'IP 與路由題先切網段',
        body:
          'CIDR、子網路遮罩、IPv4/IPv6、路由表與 longest-prefix matching 題需要先切出網路位址、主機範圍與下一跳。若題目混入 ARP、ICMP 或 traceroute，則再判斷它是位址解析、錯誤回報還是路徑探測。',
        keyPoints: ['CIDR 與子網路', '路由表與下一跳', 'ARP/ICMP/traceroute'],
        sourceRefs: [
          sourceRef(stageOneFolder, computerNetworkFiles[2]),
          sourceRef(stageOneFolder, computerNetworkFiles[5])
        ]
      },
      {
        id: 'network-security-wireless-lecture',
        title: '資安與無線題要分清威脅與防護',
        body:
          'SSL/TLS、VPN、IPsec、數位簽章、IDS/IDPS、OWASP、STRIDE、WAF、MFA 與 Wi-Fi 加密題的陷阱在於把機密性、完整性、認證、不可否認性、Web 防護與入侵偵測混在一起。無線與 IoT 題則要確認技術範圍、距離、速率與分層角色。',
        keyPoints: ['TLS/VPN/IPsec', 'OWASP/STRIDE/IDPS/WAF/MFA', 'Wi-Fi/ZigBee/Bluetooth/IoT'],
        sourceRefs: [
          sourceRef(stageOneFolder, computerNetworkFiles[4]),
          sourceRef(stageOneFolder, computerNetworkFiles[5])
        ]
      }
    ],
    reviewChecklist: [
      '能對應 OSI 七層與 TCP/IP 功能',
      '能判斷 ARP、ICMP、DHCP、DNS、SMTP、FTP、LDAP、SNMP、OSPF 與 BGP 用途',
      '能說明 IPv4/IPv6、CIDR、遮罩、路由表與 longest-prefix matching',
      '能區分 TLS、VPN、IPsec、數位簽章、IDS/IDPS、OWASP 與 STRIDE',
      '能辨識 Wi-Fi、WPAN、ZigBee、Bluetooth、IoT 與 SDN 題型'
    ],
    pitfalls: [
      {
        title: '把加密、認證與存取控管混為一談',
        explanation: 'TLS 偏向傳輸加密，認證確認身分，防火牆處理存取規則，三者在題目中常被混合干擾。',
        sourceRefs: [sourceRef(stageOneFolder, computerNetworkFiles[6])]
      },
      {
        title: '把協定名稱和所在層級錯配',
        explanation: 'ARP、ICMP、TCP、UDP、SMTP、SNMP 等名稱常一起出現，需回到層級與功能判斷，不可只看英文縮寫熟悉度。',
        sourceRefs: [
          sourceRef(stageOneFolder, computerNetworkFiles[1]),
          sourceRef(stageOneFolder, computerNetworkFiles[4])
        ]
      }
    ],
    questionMappings: [
      mapping({
        subject: '網路概論',
        examPointId: 'network-layering',
        difficulty: 'basic',
        questionType: 'concept-check',
        questionStem: '題目問交換器主要依哪一類位址轉送資料框時，應回到哪個考點？',
        options: ['資料鏈結層與 MAC 位址', '應用層與 DNS 名稱', '作業系統排程', '資料庫交易隔離'],
        correctAnswer: 'A',
        optionExplanations: ['交換器常以 MAC 位址處理資料框。', 'DNS 名稱解析不屬於交換器主要功能。', '排程是計算機原理範圍。', '交易隔離是資訊管理或資料庫概念。'],
        lectureSectionId: 'network-layer-lecture',
        sourceRef: firstNetworkingSource
      }),
      mapping({
        subject: '網路概論',
        examPointId: 'network-addressing',
        difficulty: 'intermediate',
        questionType: 'calculation-check',
        questionStem: 'CIDR 或子網路題出現時，應優先確認哪個資訊？',
        options: ['網路位址、遮罩與主機範圍', 'Java byte 溢位', 'ERP 模組', '英文時態一致'],
        correctAnswer: 'A',
        optionExplanations: [
          'CIDR 題需要先切網段與可用主機範圍。',
          'Java byte 溢位屬於程式設計或計算機原理。',
          'ERP 是資訊管理。',
          '英文時態屬於語言路由。'
        ],
        lectureSectionId: 'network-address-routing-lecture',
        sourceRef: sourceRef(stageOneFolder, computerNetworkFiles[5])
      }),
      mapping({
        subject: '網路概論',
        examPointId: 'network-security-wireless',
        difficulty: 'advanced',
        questionType: 'scenario-check',
        questionStem: '若題目同時出現 TLS、VPN、IDS 與數位簽章，應如何降低誤判？',
        options: ['先分辨機密性、認證、偵測與不可否認性', '先計算二補數範圍', '先找資料庫正規化階層', '先判斷國文主旨'],
        correctAnswer: 'A',
        optionExplanations: [
          '安全題常以不同安全目標互相干擾，需先分功能。',
          '二補數範圍是計算機原理。',
          '正規化是資料庫/資訊管理範圍。',
          '國文主旨屬於共同科目語言。'
        ],
        lectureSectionId: 'network-security-wireless-lecture',
        sourceRef: sourceRef(stageOneFolder, computerNetworkFiles[4])
      })
    ],
    synthesisBatches: synthesisBatches(1, 'networking', computerNetworkFiles, '網路概論整併工作項彙整所有年度來源，統一分層、位址、協定、設備與資安考點。')
  },
  {
    id: 'information-management',
    title: '資訊管理',
    routePath: '/information-management',
    category: 'professional',
    stage: 2,
    sourceFolders: [stageTwoFolder],
    overview:
      '資訊管理整理資訊系統、資料治理、專案管理、資安管理、企業流程與組織應用題型，目標是把情境題中的管理語彙轉成可判斷的原則與選項比較。',
    highFrequencyPoints: [
      {
        id: 'management-information-systems',
        title: '資訊系統與組織流程',
        summary: 'TPS、MIS、DSS、ERP、CRM 與 SCM 常以用途、管理層級與流程整合出題。',
        sourceRefs: [firstManagementSource]
      },
      {
        id: 'management-project-security',
        title: '專案與資安管理',
        summary: '專案時程、風險、治理、資安政策與內控觀念常出現在情境判斷。',
        sourceRefs: [sourceRef(stageTwoFolder, managementProgrammingFiles[4])]
      },
      {
        id: 'management-data-governance',
        title: '資料庫、資料治理與決策支援',
        summary: 'SQL、DDL、主鍵/外鍵、JOIN、GROUP BY、正規化、NoSQL、資料品質、資料倉儲、BI、KPI、知識管理與決策支援常以管理目的與組織情境出題。',
        sourceRefs: [
          sourceRef(stageTwoFolder, managementProgrammingFiles[2]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[5]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[6])
        ]
      },
      {
        id: 'management-security-risk',
        title: '資安治理、風險與營運持續',
        summary: 'ISMS、ISO/IEC 27001、PDCA、SQL Injection、XSS、CSRF、SSDLC、APT、備援、災難復原、存取控制、個資與稽核題常用「責任歸屬」與「控制目的」判斷。',
        sourceRefs: [
          sourceRef(stageTwoFolder, managementProgrammingFiles[3]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[6]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[7])
        ]
      },
      {
        id: 'management-cloud-transformation',
        title: '雲端、數位轉型與機器學習',
        summary: 'IaaS/PaaS/SaaS、部署模型、數位轉型階段、監督/非監督學習、分群、PCA 與 Overfitting 逐年出現。',
        sourceRefs: [
          sourceRef(stageTwoFolder, managementProgrammingFiles[4]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[5])
        ]
      },
      {
        id: 'management-network-dns',
        title: '網路診斷、DNS 安全與 IPv6',
        summary: 'traceroute、TTL、ICMP、BGP/ECMP/NAT/MPLS/QoS、DoH、DoT、DNSSEC 與 IPv4/IPv6 比較用來檢查網路治理與安全判斷。',
        sourceRefs: [
          sourceRef(stageTwoFolder, managementProgrammingFiles[7]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[6])
        ]
      },
      {
        id: 'management-uml-analysis',
        title: 'UML 與系統分析圖',
        summary: 'Use Case、Class、Sequence 與 Communication Diagram 常要求能說明用途、元素、關係與互動順序。',
        sourceRefs: [sourceRef(stageTwoFolder, managementProgrammingFiles[6])]
      }
    ],
    yearlySources: yearlySources(stageTwoFolder, managementProgrammingFiles, ['資訊管理', '程式設計']),
    lectureSections: [
      {
        id: 'management-systems-lecture',
        title: '資訊系統先看服務對象',
        body:
          '管理類題目先判斷系統服務的是作業層、管理層還是決策層，再看它支援的是交易處理、報表分析、決策輔助或跨部門流程整合。這個順序能快速排除只描述技術名詞但不符合用途的選項，並把情境關鍵字連回管理目的。',
        keyPoints: ['管理層級', '企業系統用途', '流程整合'],
        sourceRefs: [firstManagementSource]
      },
      {
        id: 'management-governance-lecture',
        title: '治理題用控制目標判斷',
        body:
          '資訊管理的治理與資安題不只問制度名稱，而是問組織想降低什麼風險、保護什麼資產、維持什麼服務水準。解題時先確認控制目標，再比較政策、稽核、備援、存取控制與教育訓練各自處理的問題。',
        keyPoints: ['風險管理', '資安治理', '營運持續'],
        sourceRefs: [
          sourceRef(stageTwoFolder, managementProgrammingFiles[3]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[6])
        ]
      },
      {
        id: 'management-data-decision-lecture',
        title: '資料與決策題先看資料用途',
        body:
          'SQL、正規化、NoSQL、資料倉儲、BI、DSS、KPI、資料治理與知識管理題通常在比較資料被誰使用、用來支援什麼決策，以及是否要求跨系統整合。先分清交易資料、分析資料與知識沉澱，選項差異會更清楚；若題目要求「全部符合」，要想到關聯除法、雙重 NOT EXISTS 或以 GROUP BY/HAVING 檢查集合覆蓋。',
        keyPoints: ['SQL/正規化/NoSQL', '資料倉儲與 BI', 'DSS/KPI', '關聯除法與全稱條件'],
        sourceRefs: [
          sourceRef(stageTwoFolder, managementProgrammingFiles[1]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[2]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[5]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[6])
        ]
      },
      {
        id: 'management-cloud-ml-lecture',
        title: '雲端、轉型與機器學習題先分層',
        body:
          '雲端題先分 IaaS、PaaS、SaaS 與部署模型；數位轉型題先看文化、人才、資料、技術與策略執行；機器學習題先分監督式、非監督式、分類、迴歸、分群與降維。三類題都常用名詞相近但目的不同來干擾。',
        keyPoints: ['IaaS/PaaS/SaaS', '數位轉型構面', '監督式/非監督式學習'],
        sourceRefs: [
          sourceRef(stageTwoFolder, managementProgrammingFiles[4]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[5])
        ]
      },
      {
        id: 'management-sql-index-lecture',
        title: 'SQL 與索引題先分目的',
        body:
          '資料庫題先確認題目是在建立 schema、查詢資料、聚合彙總、表達全稱條件，還是估算效能。DDL、主鍵、外鍵處理資料結構；JOIN、GROUP BY、SUM 處理查詢與彙總；B+ tree、clustered index 與硬碟頁 I/O 則處理查詢成本，不能把語法正確性與效能估算混成同一個判斷。',
        keyPoints: ['DDL/PK/FK', 'JOIN/GROUP BY/SUM', 'B+ tree 與 I/O 成本'],
        sourceRefs: [sourceRef(stageTwoFolder, managementProgrammingFiles[6])]
      },
      {
        id: 'management-network-security-lecture',
        title: '網路診斷與 DNS 安全要分層',
        body:
          'traceroute 題用 TTL 遞增與 ICMP Time Exceeded 觀察路徑跳數，但結果可能受非對稱路由、防火牆、NAT、MPLS、BGP 政策或 ECMP 影響。DNS 安全題則要分清 DoH/DoT 保護查詢傳輸與隱私，DNSSEC 驗證資料真實性與完整性；三者互補，不能互相取代。',
        keyPoints: ['traceroute/TTL/ICMP', 'BGP/ECMP/NAT/MPLS', 'DoH/DoT/DNSSEC'],
        sourceRefs: [sourceRef(stageTwoFolder, managementProgrammingFiles[7])]
      },
      {
        id: 'management-uml-lecture',
        title: 'UML 圖種用問題類型選',
        body:
          'UML 題先判斷題目要表達需求、靜態結構還是動態互動。Use Case 圖描述 actor 與使用案例；Class 圖描述類別、屬性、方法與關係；Sequence 圖強調時間順序與 lifeline；Communication 圖強調物件互動與訊息關係。先選對圖種，再補元素與關係。',
        keyPoints: ['Use Case', 'Class Diagram', 'Sequence/Communication'],
        sourceRefs: [sourceRef(stageTwoFolder, managementProgrammingFiles[6])]
      }
    ],
    reviewChecklist: [
      '能區分 TPS/MIS/DSS/BI 的服務對象',
      '能說明 ERP/CRM/SCM 與流程整合差異',
      '能用風險、內控、備援、稽核與營運持續語彙判斷情境題',
      '能把 SQL、正規化、NoSQL、資料治理、資料倉儲、KPI 與知識管理放回決策支援脈絡',
      '能區分雲端服務模型、數位轉型構面與機器學習類型',
      '能說明關聯除法、B+ tree、ISMS/PDCA、DoH/DoT/DNSSEC、IPv4/IPv6 與 UML 圖種的判斷重點'
    ],
    pitfalls: [
      {
        title: '看到系統名稱就直接背答案',
        explanation: '資訊管理題常改寫情境，必須回到服務對象、資料流與管理目的判斷，而不是只記縮寫。',
        sourceRefs: [firstManagementSource]
      },
      {
        title: '把資安工具當成治理目標',
        explanation: '防火牆、備份、稽核或教育訓練只是手段，題目常真正考的是機密性、完整性、可用性、責任分工或營運持續。',
        sourceRefs: [sourceRef(stageTwoFolder, managementProgrammingFiles[6])]
      },
      {
        title: '把 DNS 傳輸加密誤認為資料簽章',
        explanation: 'DoH/DoT 主要保護查詢傳輸與隱私，DNSSEC 才是驗證 DNS 資料真實性與完整性；若題目問防快取汙染，不能只回答加密通道。',
        sourceRefs: [sourceRef(stageTwoFolder, managementProgrammingFiles[7])]
      }
    ],
    questionMappings: [
      mapping({
        subject: '資訊管理',
        examPointId: 'management-information-systems',
        difficulty: 'intermediate',
        questionType: 'scenario-check',
        questionStem: '若題目描述跨部門整合採購、庫存與財務流程，最接近哪一類考點？',
        options: ['ERP 與流程整合', '二補數表示', 'TCP 三向交握', '遞迴函式終止條件'],
        correctAnswer: 'A',
        optionExplanations: ['ERP 強調企業資源與流程整合。', '二補數是計算機原理。', '三向交握是網路概論。', '遞迴終止是程式設計。'],
        lectureSectionId: 'management-systems-lecture',
        sourceRef: firstManagementSource
      }),
      mapping({
        subject: '資訊管理',
        examPointId: 'management-security-risk',
        difficulty: 'intermediate',
        questionType: 'scenario-check',
        questionStem: '若題目要求降低服務中斷造成的營運衝擊，最接近哪一個判斷軸？',
        options: ['營運持續與災難復原', '二元樹中序走訪', 'TCP 壅塞控制', '英文介系詞用法'],
        correctAnswer: 'A',
        optionExplanations: [
          '營運持續與災難復原處理服務中斷衝擊。',
          '二元樹走訪是程式設計。',
          'TCP 壅塞控制是網路概論。',
          '介系詞用法是語言路由。'
        ],
        lectureSectionId: 'management-governance-lecture',
        sourceRef: sourceRef(stageTwoFolder, managementProgrammingFiles[6])
      }),
      mapping({
        subject: '資訊管理',
        examPointId: 'management-data-governance',
        difficulty: 'advanced',
        questionType: 'database-check',
        questionStem: '若題目要求消除部分相依與遞移相依，應回到哪個考點？',
        options: ['資料庫正規化', 'Wi-Fi 隱藏節點', 'C 語言 gets 緩衝區', '英文閱讀主旨'],
        correctAnswer: 'A',
        optionExplanations: [
          '正規化用來處理資料異常與相依問題。',
          'Wi-Fi 隱藏節點是網路概論。',
          'gets 緩衝區是程式安全題。',
          '閱讀主旨是語言路由。'
        ],
        lectureSectionId: 'management-data-decision-lecture',
        sourceRef: sourceRef(stageTwoFolder, managementProgrammingFiles[2])
      }),
      mapping({
        subject: '資訊管理',
        examPointId: 'management-security-risk',
        difficulty: 'advanced',
        questionType: 'governance-check',
        questionStem: '若題目要求說明 ISO/IEC 27001 導入流程，最應連回哪個治理架構？',
        options: ['ISMS 與 PDCA 持續改善', 'AVL 旋轉規則', 'CIDR 主機數計算', '英文時態一致'],
        correctAnswer: 'A',
        optionExplanations: [
          'ISO/IEC 27001 常以 ISMS、風險評估、控制措施與 PDCA 持續改善出題。',
          'AVL 旋轉屬於程式設計資料結構。',
          'CIDR 主機數是網路概論或網路診斷題。',
          '英文時態屬於語言路由。'
        ],
        lectureSectionId: 'management-governance-lecture',
        sourceRef: sourceRef(stageTwoFolder, managementProgrammingFiles[6])
      }),
      mapping({
        subject: '資訊管理',
        examPointId: 'management-network-dns',
        difficulty: 'advanced',
        questionType: 'security-comparison',
        questionStem: '若題目比較 DoH、DoT 與 DNSSEC，哪個判斷最精準？',
        options: ['DoH/DoT 保護傳輸，DNSSEC 驗證 DNS 資料', '三者都只負責子網路切割', '三者都能取代 SQL 參數化', '三者只影響 Java GC'],
        correctAnswer: 'A',
        optionExplanations: [
          'DoH/DoT 聚焦加密查詢通道與隱私，DNSSEC 聚焦簽章驗證與完整性。',
          '子網路切割是 IP 位址規劃問題。',
          'SQL 參數化是 Web/資料庫安全防禦。',
          'Java GC 與 DNS 安全無關。'
        ],
        lectureSectionId: 'management-network-security-lecture',
        sourceRef: sourceRef(stageTwoFolder, managementProgrammingFiles[7])
      }),
      mapping({
        subject: '資訊管理',
        examPointId: 'management-uml-analysis',
        difficulty: 'intermediate',
        questionType: 'modeling-check',
        questionStem: '若題目要求呈現物件之間依時間順序傳遞訊息，最適合哪個 UML 圖？',
        options: ['Sequence Diagram', 'B+ tree 索引圖', 'DNS AAAA 紀錄', '快樂數循環表'],
        correctAnswer: 'A',
        optionExplanations: [
          'Sequence Diagram 用 lifeline 與 message 表達時間順序互動。',
          'B+ tree 是資料庫索引結構。',
          'AAAA 紀錄是 IPv6 位址的 DNS 紀錄。',
          '快樂數循環表是演算法追蹤。'
        ],
        lectureSectionId: 'management-uml-lecture',
        sourceRef: sourceRef(stageTwoFolder, managementProgrammingFiles[6])
      })
    ],
    synthesisBatches: synthesisBatches(2, 'information-management', managementProgrammingFiles, '資訊管理整併工作項彙整所有指定來源，統一資訊系統、治理、專案與資安管理考點。')
  },
  {
    id: 'programming',
    title: '程式設計',
    routePath: '/programming',
    category: 'professional',
    stage: 2,
    sourceFolders: [stageTwoFolder],
    overview:
      '程式設計聚焦流程控制、資料結構、演算法、複雜度、物件導向與程式閱讀。對已熟悉 JavaScript 的學習者，可用變數追蹤與條件分支觀念連結考題，但仍以考試語境為準。',
    highFrequencyPoints: [
      {
        id: 'programming-control-flow',
        title: '流程控制與輸出追蹤',
        summary: '迴圈、條件、遞迴與變數更新常用來測試程式閱讀與邊界條件。',
        sourceRefs: [firstProgrammingSource]
      },
      {
        id: 'programming-data-structures',
        title: '資料結構與演算法概念',
        summary: '堆疊、佇列、環狀佇列、BST、二元樹重建、AVL、排序、搜尋與時間複雜度常以概念比較、圖形操作或輸出判斷出題。',
        sourceRefs: [
          sourceRef(stageTwoFolder, managementProgrammingFiles[2]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[6])
        ]
      },
      {
        id: 'programming-language-semantics',
        title: '語言語意、型別與參數傳遞',
        summary: 'C/Java/Python 題常檢查型別轉換、陣列、指標或參照、primitive/reference、stack/heap、函式呼叫與遞迴副作用。',
        sourceRefs: [
          sourceRef(stageTwoFolder, managementProgrammingFiles[1]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[5]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[7])
        ]
      },
      {
        id: 'programming-complexity-design',
        title: '複雜度、模組化與物件導向',
        summary: 'Big-O、遞迴、Quick Sort、Insertion Sort、最大乘積、快樂數、質數平方、物件導向、封裝、繼承、多型與模組化設計常用來比較程式可讀性與效率。',
        sourceRefs: [
          sourceRef(stageTwoFolder, managementProgrammingFiles[3]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[6]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[7])
        ]
      },
      {
        id: 'programming-security-data-processing',
        title: '輸入驗證、程式安全與資料處理',
        summary: '身分證格式、員工代號檢核、buffer overflow、Python 資料清理、SQLite 寫入與參數化 SQL 都是實作型題目。',
        sourceRefs: [
          sourceRef(stageTwoFolder, managementProgrammingFiles[0]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[5])
        ]
      },
      {
        id: 'programming-java-web-security',
        title: 'Java 記憶體與 Web 安全程式設計',
        summary: 'Java GC、不可達物件、System.gc() 不保證立即執行，以及 SQL Injection、XSS、CSRF 的防禦清單是近年實作與觀念混合題。',
        sourceRefs: [sourceRef(stageTwoFolder, managementProgrammingFiles[7])]
      }
    ],
    yearlySources: yearlySources(stageTwoFolder, managementProgrammingFiles, ['資訊管理', '程式設計']),
    lectureSections: [
      {
        id: 'programming-trace-lecture',
        title: '程式閱讀用表格追蹤狀態',
        body:
          '遇到流程控制與輸出題時，不要只看最後一行。先列出每次迴圈的索引、條件判斷、變數更新與輸出內容，遞迴題則要先找終止條件，再往回推回傳值或副作用，最後檢查邊界值是否被執行。',
        keyPoints: ['迴圈追蹤', '條件分支', '遞迴終止'],
        sourceRefs: [firstProgrammingSource]
      },
      {
        id: 'programming-structure-lecture',
        title: '資料結構題先判斷操作規則',
        body:
          'Stack、Queue、Tree、Graph、Hash、排序與搜尋題，重點是操作順序與成本。先判斷插入、刪除、查找或走訪規則，再用小表格追蹤狀態，最後才比較時間複雜度或穩定性。若題目給前序與中序，先用根節點切左右子樹；若題目給 AVL 插入序列，則逐步檢查平衡因子與旋轉。',
        keyPoints: ['Stack/Queue', 'Tree/Graph/Hash', '排序搜尋複雜度', '二元樹重建與 AVL'],
        sourceRefs: [
          sourceRef(stageTwoFolder, managementProgrammingFiles[2]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[6])
        ]
      },
      {
        id: 'programming-language-lecture',
        title: '語言差異題要回到型別與呼叫',
        body:
          'C、Java、Python 題常把語法熟悉度變成陷阱，例如陣列索引、型別轉換、傳值與傳址、遞迴回傳、物件導向多型。解題時先判斷語言規則，再追蹤實際值，不把 JS 直覺硬套到所有語言。',
        keyPoints: ['C/Java/Python', '型別與轉型', '參數傳遞與 OOP'],
        sourceRefs: [
          sourceRef(stageTwoFolder, managementProgrammingFiles[1]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[5])
        ]
      },
      {
        id: 'programming-security-data-lecture',
        title: '實作型題目先守住輸入與資料邊界',
        body:
          '格式檢查、SQL 參數化、C 語言安全輸入、Python 資料清理與 SQLite 寫入題，都在考輸入邊界與資料品質。先確認欄位長度、型別、空值、字元集合與資料庫寫入方式，再處理流程或演算法。',
        keyPoints: ['輸入驗證', 'buffer overflow', 'Python/SQLite ETL'],
        sourceRefs: [
          sourceRef(stageTwoFolder, managementProgrammingFiles[0]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[5])
        ]
      },
      {
        id: 'programming-tree-sort-lecture',
        title: '樹與排序題用操作序列驗證',
        body:
          '二元樹重建、AVL 插入、Insertion Sort 與 Quick Sort 題都需要把每一步操作寫出來。樹題先標出根、左右子樹與旋轉時機；排序題先確認比較方向、元素位移與 pivot 或 comparator 的作用。若題目要求判斷只有三個因數的差值，則要把數論條件轉成「質數的平方」。',
        keyPoints: ['前序/中序重建', 'AVL 旋轉', 'Insertion Sort/Quick Sort', '質數平方'],
        sourceRefs: [
          sourceRef(stageTwoFolder, managementProgrammingFiles[6]),
          sourceRef(stageTwoFolder, managementProgrammingFiles[4])
        ]
      },
      {
        id: 'programming-java-security-lecture',
        title: 'Java 與 Web 安全題先分責任',
        body:
          'Java 題先分 primitive type 與 reference type，再看 stack、heap、可達性與垃圾回收；System.gc() 只是建議，不保證立即回收。Web 安全題則要把 SQL Injection、XSS、CSRF 分別對應到參數化查詢或 ORM、輸出編碼或 CSP、Anti-CSRF token、SameSite 與 HttpOnly 等防禦。',
        keyPoints: ['primitive/reference', 'GC 與不可達物件', 'SQL Injection/XSS/CSRF 防禦'],
        sourceRefs: [sourceRef(stageTwoFolder, managementProgrammingFiles[7])]
      }
    ],
    reviewChecklist: [
      '能手動追蹤迴圈、條件與遞迴輸出',
      '能區分 Stack、Queue、Tree、Graph、Hash 的操作規則',
      '能說明排序、搜尋與遞迴的基本時間複雜度',
      '能辨識 C/Java/Python 的型別、陣列、參數傳遞與 OOP 陷阱',
      '能檢查輸入驗證、buffer overflow、SQL 參數化與 Python/SQLite 資料處理流程',
      '能追蹤前序/中序重建、AVL 旋轉、Insertion Sort、快樂數循環偵測、Java GC 與 Web 安全防禦'
    ],
    pitfalls: [
      {
        title: '忽略邊界條件與初始值',
        explanation: '程式題常把錯誤藏在初始值、迴圈條件或遞迴終止條件，必須逐步追蹤而不是直覺判斷。',
        sourceRefs: [firstProgrammingSource]
      },
      {
        title: '把資料結構名稱當成答案',
        explanation: '同一個資料結構可能考操作規則、時間複雜度或走訪順序，必須看題目問的是行為、成本還是輸出。',
        sourceRefs: [sourceRef(stageTwoFolder, managementProgrammingFiles[6])]
      },
      {
        title: '以為呼叫 System.gc() 就會立即釋放記憶體',
        explanation: 'Java 垃圾回收取決於可達性與 JVM 行為，System.gc() 只是建議；題目若問保證行為，不能把它當成同步釋放指令。',
        sourceRefs: [sourceRef(stageTwoFolder, managementProgrammingFiles[7])]
      }
    ],
    questionMappings: [
      mapping({
        subject: '程式設計',
        examPointId: 'programming-control-flow',
        difficulty: 'intermediate',
        questionType: 'trace-check',
        questionStem: '追蹤迴圈輸出時，最能降低誤判的方法是什麼？',
        options: ['列出每次迴圈的變數狀態', '只看函式名稱', '先背企業系統縮寫', '只判斷封包所在層級'],
        correctAnswer: 'A',
        optionExplanations: ['逐次列狀態能避免漏掉更新與邊界。', '函式名稱不足以確認輸出。', '企業系統縮寫是資訊管理。', '封包層級是網路概論。'],
        lectureSectionId: 'programming-trace-lecture',
        sourceRef: firstProgrammingSource
      }),
      mapping({
        subject: '程式設計',
        examPointId: 'programming-data-structures',
        difficulty: 'intermediate',
        questionType: 'concept-check',
        questionStem: '若題目比較 Stack 與 Queue，最核心的差異是什麼？',
        options: ['取出順序規則不同', '企業流程整合方式不同', 'TLS 憑證不同', '英文轉折語氣不同'],
        correctAnswer: 'A',
        optionExplanations: [
          'Stack 常見 LIFO，Queue 常見 FIFO。',
          '企業流程是資訊管理。',
          'TLS 憑證是網路概論。',
          '轉折語氣是語言路由。'
        ],
        lectureSectionId: 'programming-structure-lecture',
        sourceRef: sourceRef(stageTwoFolder, managementProgrammingFiles[6])
      }),
      mapping({
        subject: '程式設計',
        examPointId: 'programming-security-data-processing',
        difficulty: 'advanced',
        questionType: 'implementation-check',
        questionStem: 'C 程式讀入固定長度陣列時，最應避免哪一種做法？',
        options: ['不限制長度的輸入函式', '先定義資料表主鍵', '使用 VPN 建立連線', '判斷英文轉折詞'],
        correctAnswer: 'A',
        optionExplanations: [
          '不限制長度會造成緩衝區溢位風險。',
          '資料表主鍵是資訊管理資料庫設計。',
          'VPN 是網路概論。',
          '英文轉折詞是語言路由。'
        ],
        lectureSectionId: 'programming-security-data-lecture',
        sourceRef: sourceRef(stageTwoFolder, managementProgrammingFiles[5])
      }),
      mapping({
        subject: '程式設計',
        examPointId: 'programming-data-structures',
        difficulty: 'advanced',
        questionType: 'structure-trace',
        questionStem: '由前序與中序重建二元樹時，第一步應先做什麼？',
        options: ['以前序第一個節點作為根並切分中序左右子樹', '先套用 DNSSEC 簽章驗證', '先建立 ERP 採購流程', '先判斷英文轉折語氣'],
        correctAnswer: 'A',
        optionExplanations: [
          '前序第一個節點是根，可用它在中序中的位置切出左右子樹。',
          'DNSSEC 是 DNS 安全題。',
          'ERP 採購流程屬於資訊管理。',
          '英文轉折語氣屬於語言路由。'
        ],
        lectureSectionId: 'programming-tree-sort-lecture',
        sourceRef: sourceRef(stageTwoFolder, managementProgrammingFiles[6])
      }),
      mapping({
        subject: '程式設計',
        examPointId: 'programming-complexity-design',
        difficulty: 'advanced',
        questionType: 'algorithm-check',
        questionStem: '若題目要求判斷 |a-b| 是否只有三個正因數，核心條件是什麼？',
        options: ['|a-b| 必須是質數的平方', '必須是 IPv6 位址', '必須是第三正規化資料表', '必須是被動語態句型'],
        correctAnswer: 'A',
        optionExplanations: [
          '只有三個因數的正整數形式為 p^2，其中 p 為質數。',
          'IPv6 位址是網路概念。',
          '第三正規化是資料庫設計概念。',
          '被動語態是英文文法概念。'
        ],
        lectureSectionId: 'programming-tree-sort-lecture',
        sourceRef: sourceRef(stageTwoFolder, managementProgrammingFiles[6])
      }),
      mapping({
        subject: '程式設計',
        examPointId: 'programming-java-web-security',
        difficulty: 'intermediate',
        questionType: 'language-security-check',
        questionStem: 'Java 記憶體題問到 System.gc() 時，哪個敘述最正確？',
        options: ['它可提出回收建議但不保證立即執行', '它一定會刪除所有 stack 變數', '它會啟用 DNSSEC', '它會完成 SQL JOIN'],
        correctAnswer: 'A',
        optionExplanations: [
          'System.gc() 不保證立即回收，仍取決於 JVM 與物件可達性。',
          'stack 變數生命週期與 GC 行為不同。',
          'DNSSEC 是 DNS 資料驗證機制。',
          'SQL JOIN 是資料庫查詢。'
        ],
        lectureSectionId: 'programming-java-security-lecture',
        sourceRef: sourceRef(stageTwoFolder, managementProgrammingFiles[7])
      }),
      mapping({
        subject: '程式設計',
        examPointId: 'programming-java-web-security',
        difficulty: 'advanced',
        questionType: 'web-security-check',
        questionStem: '若題目要求降低 CSRF 風險，最直接相關的防禦組合是什麼？',
        options: ['Anti-CSRF token 與 SameSite Cookie', 'B+ tree clustered index', 'AVL LL 旋轉', '國文段落主旨'],
        correctAnswer: 'A',
        optionExplanations: [
          'CSRF 防禦常用 token、SameSite、HttpOnly 與正確的狀態變更請求保護。',
          'B+ tree 索引是資料庫效能題。',
          'AVL 旋轉是資料結構題。',
          '段落主旨是語言路由。'
        ],
        lectureSectionId: 'programming-java-security-lecture',
        sourceRef: sourceRef(stageTwoFolder, managementProgrammingFiles[7])
      })
    ],
    synthesisBatches: synthesisBatches(2, 'programming', managementProgrammingFiles, '程式設計整併工作項彙整所有指定來源，統一流程控制、資料結構、演算法與程式閱讀考點。')
  },
  {
    id: 'language',
    title: '語言',
    routePath: '/language',
    category: 'common',
    stage: 3,
    sourceFolders: [stageThreeFolder],
    overview:
      '語言路由承載國文與英文共同科目，整合 107–112 年作文時事題與英文選擇題。國文以國營事業的科技轉型、ESG、企業韌性、投資環境與員工成長為主軸；英文則聚焦字彙語境、核心文法、克漏字與跨領域閱讀。',
    highFrequencyPoints: [
      {
        id: 'language-composition-public',
        title: '國營事業作文的公共任務',
        summary: '作文題常要求同時掌握企業經營、公共政策、供電水資源、能源穩定、投資環境與社會責任。',
        sourceRefs: [
          sourceRef(stageThreeFolder, languageFiles[1]),
          sourceRef(stageThreeFolder, languageFiles[3])
        ]
      },
      {
        id: 'language-composition-technology',
        title: '科技轉型、AI 與員工價值',
        summary: 'AI、大數據、IoT、雲端、區塊鏈、智慧客服、資料分析與人機協作反覆用來考經營績效與員工因應。',
        sourceRefs: [
          firstLanguageSource,
          sourceRef(stageThreeFolder, languageFiles[5])
        ]
      },
      {
        id: 'language-composition-esg-resilience',
        title: 'ESG、永續與企業韌性',
        summary: 'ESG、淨零、氣候變遷、風險管控、內控、危機調適與供應鏈韌性，是近年國文作文最能共用的素材。',
        sourceRefs: [
          sourceRef(stageThreeFolder, languageFiles[3]),
          sourceRef(stageThreeFolder, languageFiles[4])
        ]
      },
      {
        id: 'language-english-grammar',
        title: '英文核心文法反覆考',
        summary: '關係代名詞、whose、some of which、假設語氣、Should/Only if 倒裝、分詞、V-ing、動名詞與不定詞幾乎年年出現。',
        sourceRefs: [
          sourceRef(stageThreeFolder, languageFiles[2]),
          sourceRef(stageThreeFolder, languageFiles[5])
        ]
      },
      {
        id: 'language-english-vocabulary-cloze',
        title: '語境字彙、片語與克漏字',
        summary: '抽象名詞、社會議題、環境健康、心理學、介系詞、片語動詞與慣用語都需用前後文判斷。',
        sourceRefs: [
          sourceRef(stageThreeFolder, languageFiles[1]),
          sourceRef(stageThreeFolder, languageFiles[4])
        ]
      },
      {
        id: 'language-english-reading',
        title: '跨領域閱讀理解',
        summary: '閱讀與克漏字素材涵蓋禮儀文明、有機食品、心理偏誤、love chemistry、創傷後成長與再生能源，常考主旨、細節、推論與詞義。',
        sourceRefs: [
          sourceRef(stageThreeFolder, languageFiles[0]),
          sourceRef(stageThreeFolder, languageFiles[5])
        ]
      }
    ],
    yearlySources: yearlySources(stageThreeFolder, languageFiles, ['國文', '英文']),
    lectureSections: [
      {
        id: 'language-composition-framework-lecture',
        title: '國營作文先定位主體與任務',
        body:
          '國文作文題先確認題目主體是國營事業、員工、投資環境或企業韌性，再決定論述角度。國營事業兼具公共性、企業性與政策任務，因此分論點最好同時涵蓋經營效率、基礎服務穩定、社會責任與永續發展，不要只寫一般企業管理。',
        keyPoints: ['公共性/企業性/政策性', '審題主體', '三面向論證'],
        sourceRefs: [
          sourceRef(stageThreeFolder, languageFiles[1]),
          sourceRef(stageThreeFolder, languageFiles[2])
        ]
      },
      {
        id: 'language-composition-technology-lecture',
        title: '科技與 AI 題要寫應用也寫治理',
        body:
          '107 年新科技與 112 年 AI 題可共用科技轉型素材，但不能把所有新科技都簡化成 AI。可從 AI、大數據、IoT、雲端、區塊鏈、智慧客服、預測性維修與資料治理切入經營績效，再補上個資、資安、演算法偏誤、智慧型犯罪與員工能力升級等治理面。',
        keyPoints: ['AI/大數據/IoT/雲端/區塊鏈', '經營績效', '人機協作與治理風險'],
        sourceRefs: [
          firstLanguageSource,
          sourceRef(stageThreeFolder, languageFiles[5])
        ]
      },
      {
        id: 'language-composition-esg-resilience-lecture',
        title: 'ESG 與韌性題用前中後風險架構',
        body:
          '110 年 ESG 與 111 年企業韌性題都不能只停在口號。ESG 要分環境、社會、治理三面向；韌性要包含事前風險辨識、事中應變、事後復原與轉型。若能連結淨零、能源風險、供應鏈、內控與利害關係人，作文會比單純談環保更完整。',
        keyPoints: ['E/S/G 三面向', '風險辨識/應變/復原', '淨零與利害關係人'],
        sourceRefs: [
          sourceRef(stageThreeFolder, languageFiles[3]),
          sourceRef(stageThreeFolder, languageFiles[4])
        ]
      },
      {
        id: 'language-english-grammar-lecture',
        title: '英文文法先判斷句構功能',
        body:
          '英文文法題不要只憑單字熟悉度。關係子句先找先行詞與子句功能，注意 whose 與 some of which；假設語氣與倒裝要先看條件、時態與主句位置，Only if 只倒裝主句；分詞、V-ing、動名詞與不定詞則要確認修飾對象與動詞搭配。',
        keyPoints: ['關係子句', '假設語氣與倒裝', '分詞/V-ing/動名詞/不定詞'],
        sourceRefs: [
          sourceRef(stageThreeFolder, languageFiles[2]),
          sourceRef(stageThreeFolder, languageFiles[5])
        ]
      },
      {
        id: 'language-english-vocabulary-cloze-lecture',
        title: '字彙與克漏字用語境排除',
        body:
          '107–112 年英文字彙常考抽象名詞、社會制度、健康心理、環境能源與能力判斷詞；片語與介系詞則包含 keep up with、lay off、stand someone up、on the ball、more than meets the eye 等。克漏字要先看段落主題、前後文正負向、詞性與搭配，不要把片語逐字翻譯。',
        keyPoints: ['抽象與社會議題字彙', '片語動詞/介系詞', '克漏字語境'],
        sourceRefs: [
          sourceRef(stageThreeFolder, languageFiles[1]),
          sourceRef(stageThreeFolder, languageFiles[4])
        ]
      },
      {
        id: 'language-english-reading-lecture',
        title: '閱讀題先分類題型再定位句子',
        body:
          '閱讀題素材跨禮儀文明、有機食品、心理偏誤、love chemistry、創傷後成長與 wave power。先判斷題目是主旨、細節、推論、詞義、否定或來源判斷，再回到段落定位句。主旨題看全文反覆概念，細節題找明確資訊，推論題要用段落線索支持，不能靠常識硬猜。',
        keyPoints: ['主旨/細節/推論/詞義', '段落定位', '跨領域素材'],
        sourceRefs: [
          firstLanguageSource,
          sourceRef(stageThreeFolder, languageFiles[5])
        ]
      }
    ],
    reviewChecklist: [
      '能明確回應作文主體：國營事業、員工、投資環境或企業韌性',
      '能把科技題寫出應用場景與風險治理，而不是只列 AI 名詞',
      '能用 E/S/G、風險辨識、危機應變與復原能力整理永續韌性題',
      '能判斷關代先行詞、假設語氣時態、倒裝位置與分詞修飾對象',
      '能用上下文判斷抽象字彙、片語動詞、介系詞與克漏字答案',
      '能分辨閱讀題的主旨、細節、推論、詞義、否定題與來源判斷'
    ],
    pitfalls: [
      {
        title: 'ESG 題只寫環境保護',
        explanation: 'ESG 題必須同時涵蓋環境、社會與治理；若只寫減碳，會漏掉利害關係人、公司治理與透明問責。',
        sourceRefs: [sourceRef(stageThreeFolder, languageFiles[3])]
      },
      {
        title: 'AI 題採取過度樂觀或悲觀立場',
        explanation: 'AI 題要兼顧效率提升、人機協作、能力轉型與治理風險，不能只寫取代人類或萬能科技。',
        sourceRefs: [sourceRef(stageThreeFolder, languageFiles[5])]
      },
      {
        title: 'Only if 與 Should 倒裝位置誤判',
        explanation: 'Only if 條件句只倒裝主句，Should 條件倒裝也要維持假設語氣邏輯，不可當成一般疑問句處理。',
        sourceRefs: [sourceRef(stageThreeFolder, languageFiles[5])]
      },
      {
        title: '片語動詞逐字翻譯',
        explanation: 'lay off、stand someone up、on the ball、more than meets the eye 等片語要以語境判斷，逐字翻譯會導致選錯。',
        sourceRefs: [sourceRef(stageThreeFolder, languageFiles[1])]
      }
    ],
    questionMappings: [
      mapping({
        subject: '語言',
        examPointId: 'language-composition-technology',
        difficulty: 'intermediate',
        questionType: 'composition-strategy',
        questionStem: '國文作文遇到「新科技提升經營績效」或「AI 浪潮」時，最完整的論述方向是什麼？',
        options: ['科技應用、經營效益、人才轉型與風險治理並列', '只列出 AI 工具名稱', '先計算子網路遮罩', '只背 SQL 正規化'],
        correctAnswer: 'A',
        optionExplanations: [
          '科技作文需兼顧應用場景、管理效益、員工能力與治理風險。',
          '只列工具名稱會缺少論證與風險分析。',
          '子網路遮罩是網路概論。',
          '正規化是資訊管理資料庫考點。'
        ],
        lectureSectionId: 'language-composition-technology-lecture',
        sourceRef: firstLanguageSource
      }),
      mapping({
        subject: '語言',
        examPointId: 'language-composition-esg-resilience',
        difficulty: 'advanced',
        questionType: 'composition-strategy',
        questionStem: '若作文題問 ESG 或企業韌性，最容易漏掉哪個完整架構？',
        options: ['ESG 三面向與風險前中後流程', 'AVL 旋轉順序', 'DNSSEC 簽章驗證', 'C 語言指標位移'],
        correctAnswer: 'A',
        optionExplanations: [
          'ESG 需涵蓋環境、社會、治理，韌性需涵蓋事前、事中、事後。',
          'AVL 旋轉屬於程式設計。',
          'DNSSEC 屬於網路/DNS 安全。',
          'C 指標位移屬於程式設計。'
        ],
        lectureSectionId: 'language-composition-esg-resilience-lecture',
        sourceRef: sourceRef(stageThreeFolder, languageFiles[3])
      }),
      mapping({
        subject: '語言',
        examPointId: 'language-english-grammar',
        difficulty: 'advanced',
        questionType: 'grammar-check',
        questionStem: 'Only if 條件句出現時，倒裝應主要發生在哪裡？',
        options: ['主句', 'if 子句', '資料庫 FROM 子句', '二元樹左子樹'],
        correctAnswer: 'A',
        optionExplanations: [
          'Only if 置於句首時，通常倒裝主句。',
          'if 子句本身不因此倒裝。',
          'FROM 子句是 SQL 語法。',
          '二元樹左子樹是資料結構。'
        ],
        lectureSectionId: 'language-english-grammar-lecture',
        sourceRef: sourceRef(stageThreeFolder, languageFiles[5])
      }),
      mapping({
        subject: '語言',
        examPointId: 'language-english-vocabulary-cloze',
        difficulty: 'intermediate',
        questionType: 'cloze-strategy',
        questionStem: '克漏字題最可靠的第一步是什麼？',
        options: ['先看段落主題、前後文語意與詞性搭配', '先背所有單字中文', '先計算快取命中率', '先畫 UML Sequence Diagram'],
        correctAnswer: 'A',
        optionExplanations: [
          '克漏字依上下文、語意正負向、詞性與搭配判斷。',
          '只背中文容易忽略語境。',
          '快取命中率是計算機原理。',
          'UML 圖屬於資訊管理系統分析。'
        ],
        lectureSectionId: 'language-english-vocabulary-cloze-lecture',
        sourceRef: sourceRef(stageThreeFolder, languageFiles[4])
      }),
      mapping({
        subject: '語言',
        examPointId: 'language-english-reading',
        difficulty: 'intermediate',
        questionType: 'reading-strategy',
        questionStem: '英文閱讀題遇到主旨與細節混合選項時，應如何降低誤判？',
        options: ['先判斷題型，再回到段落定位句比對', '只選看起來最長的選項', '只看單字第一個字母', '先判斷 TCP 連線狀態'],
        correctAnswer: 'A',
        optionExplanations: [
          '主旨、細節、推論與詞義題都需要不同定位方式。',
          '選項長短不是可靠線索。',
          '單字首字母無法判斷文章邏輯。',
          'TCP 連線狀態屬於網路概論。'
        ],
        lectureSectionId: 'language-english-reading-lecture',
        sourceRef: sourceRef(stageThreeFolder, languageFiles[5])
      })
    ],
    synthesisBatches: synthesisBatches(3, 'language', languageFiles, '語言整併工作項彙整國文與英文指定來源，統一閱讀、文意、字詞與英文文法考點。')
  }
];

export function getSubjectContentBySlug(slug: SubjectSlug): SubjectContent | undefined {
  return subjectContents.find((content) => content.id === slug);
}
