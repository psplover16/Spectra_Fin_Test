import {
  ANSWER_OPTIONS,
  type AnswerOption,
  type ExamQuestionAnalysis,
  type FourOptionRecord
} from '@/modules/examGroups/aGroup/types/questionAnalysis';
import { reviewedQuestionAnalyses } from '@/modules/examGroups/aGroup/data/years/114ReviewedAnalyses';

interface RawQuestion {
  number: number;
  answer: AnswerOption;
  pageNumber: number;
  topic: string;
  stem: string;
  options: FourOptionRecord;
  tags: string[];
}

const rawQuestions: RawQuestion[] = [
  {
    number: 1,
    answer: 'C',
    pageNumber: 1,
    topic: '二補數加法',
    stem: '在 6 位元 2 的補數系統中，執行 100111+111000 後，以 10 進位表示為何？',
    options: { A: '0', B: '1', C: '31', D: '33' },
    tags: ['computer-principles', 'binary-arithmetic']
  },
  {
    number: 2,
    answer: 'B',
    pageNumber: 1,
    topic: '馮紐曼架構',
    stem: '根據馮紐曼架構，下列何者為計算機系統的基本組成項目？',
    options: {
      A: '記憶體、CPU、硬碟、顯示器、鍵盤',
      B: '輸入單元、輸出單元、運算器、控制器、記憶體',
      C: '作業系統、應用程式、驅動程式、資料庫、網路',
      D: '快取、暫存器、ALU、控制單元、I/O 介面'
    },
    tags: ['computer-principles', 'computer-architecture']
  },
  {
    number: 3,
    answer: 'A',
    pageNumber: 1,
    topic: 'Python list 與 tuple',
    stem: '在 Python 中，下列何者為 list 和 tuple 的主要差別？',
    options: {
      A: 'list 可變，tuple 不可變',
      B: 'list 不可變，tuple 可變',
      C: 'list 無序，tuple 有序',
      D: 'tuple 支援索引，list 不支援'
    },
    tags: ['programming', 'python']
  },
  {
    number: 4,
    answer: 'C',
    pageNumber: 1,
    topic: 'CRC 錯誤偵測',
    stem: '在 CRC 錯誤偵測中，已知原始資料為 1101，生成多項式為 G(x)=X3+X1，發送端應傳送的完整資料(原始資料+CRC 碼)為何？',
    options: { A: '1101001', B: '1101011', C: '1101100', D: '1101111' },
    tags: ['networking', 'error-detection']
  },
  {
    number: 5,
    answer: 'B',
    pageNumber: 1,
    topic: '漢明碼',
    stem: '在使用偶校驗的漢明碼(Hamming Code)中，已知原始資料為 1011，發送端應傳送的完整資料(原始資料+校驗位)為何？',
    options: { A: '0011011', B: '0110011', C: '0110110', D: '1110011' },
    tags: ['computer-principles', 'error-correction']
  },
  {
    number: 6,
    answer: 'D',
    pageNumber: 1,
    topic: 'ACID 特性',
    stem: '下列何者為交易(Transaction)的 ACID 特性？',
    options: {
      A: 'Availability, Consistency, Integrity, Dependability',
      B: 'Atomicity, Concurrency, Integrity, Durability',
      C: 'Availability, Concurrency, Isolation, Dependability',
      D: 'Atomicity, Consistency, Isolation, Durability'
    },
    tags: ['database', 'transaction']
  },
  {
    number: 7,
    answer: 'A',
    pageNumber: 1,
    topic: '優先權排程與飢餓',
    stem: '在優先權排程中，為避免飢餓(Starving)發生，應採用下列何種策略？',
    options: {
      A: '老化(Aging)機制',
      B: '增加 CPU 核心數',
      C: '降低時間片(Time Quantum)長度',
      D: '強制終止高優先級進程'
    },
    tags: ['operating-system', 'scheduling']
  },
  {
    number: 8,
    answer: 'C',
    pageNumber: 1,
    topic: '二元樹走訪',
    stem: '給定一棵有 6 個節點的二元樹，前序走訪(Preorder)為 A,B,D,E,C,F，中序走訪(Inorder)為 D,B,E,A,C,F，其後序走訪(Postorder)為下列何者？',
    options: {
      A: 'A,B,D,E,C,F',
      B: 'D,B,E,F,C,A',
      C: 'D,E,B,F,C,A',
      D: 'F,C,A,E,B,D'
    },
    tags: ['data-structure', 'tree-traversal']
  },
  {
    number: 9,
    answer: 'A',
    pageNumber: 2,
    topic: '桶子排序',
    stem: '桶子排序(Bucket Sort)的時間複雜度在下列何種情況下達到 O(n)？',
    options: {
      A: '元素均勻分佈在所有桶中',
      B: '所有元素相同',
      C: '桶數量=n2',
      D: '僅一個桶'
    },
    tags: ['algorithm', 'sorting']
  },
  {
    number: 10,
    answer: 'D',
    pageNumber: 2,
    topic: '穩定排序',
    stem: '在排序演算法中，下列何者屬於「穩定排序」？',
    options: {
      A: '排序後陣列不變',
      B: '時間複雜度穩定',
      C: '空間複雜度固定',
      D: '相等的元素排序後保持原始相對順序'
    },
    tags: ['algorithm', 'sorting']
  },
  {
    number: 11,
    answer: 'A',
    pageNumber: 2,
    topic: '記憶體層次',
    stem: '在記憶體層次結構(Memory Hierarchy)中，由「最快」到「最慢」的順序為何？',
    options: {
      A: '暫存器、快取、主記憶體、硬碟',
      B: '硬碟、主記憶體、快取、暫存器',
      C: '記憶體、快取、暫存器、SSD',
      D: '快取、暫存器、DRAM、Flash'
    },
    tags: ['computer-architecture', 'memory']
  },
  {
    number: 12,
    answer: 'B',
    pageNumber: 2,
    topic: '介面與多重繼承',
    stem: '下列哪種語言必須使用介面(Interface)才能模擬「多重繼承」？',
    options: { A: 'C++', B: 'Java', C: 'JavaScript', D: 'Python' },
    tags: ['programming', 'object-oriented']
  },
  {
    number: 13,
    answer: 'C',
    pageNumber: 2,
    topic: '強型別與動態型別',
    stem: '下列哪種語言是「強型別」及「動態型別」？',
    options: { A: 'Java', B: 'JavaScript', C: 'Python', D: 'VB' },
    tags: ['programming', 'type-system']
  },
  {
    number: 14,
    answer: 'B',
    pageNumber: 2,
    topic: 'C 語言傳值呼叫',
    stem: `執行下列 C 語言程式，輸出的值為何？
#include <stdio.h>
void func(int p)
{ p = p*p; }
int main()
{
  int a=3;
  func(a);
  printf("%d\\n",a);
}`,
    options: { A: '0', B: '3', C: '9', D: '編譯錯誤' },
    tags: ['programming', 'c-language']
  },
  {
    number: 15,
    answer: 'B',
    pageNumber: 2,
    topic: 'AVL 樹',
    stem: 'AVL 樹是二元搜尋樹(BST)的一種，其與一般 BST 的差別為何？',
    options: {
      A: '允許重複鍵值',
      B: '-1 ≤ 平衡因子 ≤ 1',
      C: '支援多父節點',
      D: '父節點與子節點值相差不超過 1'
    },
    tags: ['data-structure', 'tree']
  },
  {
    number: 16,
    answer: 'D',
    pageNumber: 2,
    topic: 'XOR 與加法器',
    stem: '在 2 的補數加法器中，XOR 閘常適用於下列何種功能？',
    options: {
      A: '產生進位',
      B: '檢測溢位',
      C: '儲存符號位',
      D: '計算每位的「和」(不含進位)'
    },
    tags: ['digital-logic', 'adder']
  },
  {
    number: 17,
    answer: 'C',
    pageNumber: 2,
    topic: 'Dirty Read',
    stem: '在關聯式資料庫中，當交易的隔離層級為 READ UNCOMMITTED 時，有機會發生 Dirty Read，請問 Dirty Read 是指下列何種問題？',
    options: {
      A: '後提交的交易結果覆蓋先提交的交易結果',
      B: '重複讀取相同的資料卻拿到不一樣的值',
      C: '讀取到已修改但未提交的數據',
      D: '讀取到交易發生前的數據'
    },
    tags: ['database', 'transaction-isolation']
  },
  {
    number: 18,
    answer: 'B',
    pageNumber: 2,
    topic: '資料庫正規化',
    stem: '有關正規化的敘述，下列何者有誤？',
    options: {
      A: '第一正規化是為了消除重複資料',
      B: '第二正規化必須消除傳遞函數依賴',
      C: '第三正規化非主鍵屬性不得依賴其他非主鍵屬性',
      D: 'BCNF 中主鍵中的各欄位不可以相依於其他非主鍵的欄位'
    },
    tags: ['database', 'normalization']
  },
  {
    number: 19,
    answer: 'C',
    pageNumber: 2,
    topic: '柯里化',
    stem: '「柯里化(Currying)」是指程式設計的下列何種特性？',
    options: { A: '物件導向', B: '程序式', C: '函數式', D: '邏輯式' },
    tags: ['programming', 'functional-programming']
  },
  {
    number: 20,
    answer: 'B',
    pageNumber: 3,
    topic: '紅黑樹',
    stem: '紅黑樹插入新節點時，預設顏色為何？',
    options: { A: '黑色', B: '紅色', C: '隨機', D: '與父節點相同' },
    tags: ['data-structure', 'tree']
  },
  {
    number: 21,
    answer: 'A',
    pageNumber: 3,
    topic: 'FCFS 排程',
    stem: '下列何者為 CPU 工作排程中使用 FCFS 演算法的優點？',
    options: {
      A: '簡單易懂、容易實作且公平',
      B: '平均等待時間最短',
      C: '適合互動式系統',
      D: 'CPU 使用效率高'
    },
    tags: ['operating-system', 'scheduling']
  },
  {
    number: 22,
    answer: 'D',
    pageNumber: 3,
    topic: 'True Color RGB',
    stem: '採用全彩(True Color)模式處理數位影像時，R(0)、G(0)、B(0)所產生的顏色為何？',
    options: { A: '透明', B: '白色', C: '灰色', D: '黑色' },
    tags: ['multimedia', 'color']
  },
  {
    number: 23,
    answer: 'D',
    pageNumber: 3,
    topic: '過擬合',
    stem: '對於機器學習中的過擬合(Overfitting)問題，下列敘述何者正確？',
    options: {
      A: '訓練資料與測試資料的誤差皆低',
      B: '增加訓練資料量一定會導致過擬合',
      C: '模型對噪音資料完全忽略',
      D: '訓練資料誤差低，但測試資料誤差高'
    },
    tags: ['machine-learning', 'model-evaluation']
  },
  {
    number: 24,
    answer: 'C',
    pageNumber: 3,
    topic: 'SMP 多重處理器',
    stem: '關於 SMP 多重處理器系統的敘述，下列何者有誤？',
    options: {
      A: 'CPU 與 CPU 之間共用記憶體',
      B: '當 CPU 數量過多時，記憶體存取可能成為效能瓶頸',
      C: '當任一 CPU 故障通常會導致整個系統故障或停擺',
      D: '透過利用多個處理器並行處理任務，大幅提高系統的處理能力'
    },
    tags: ['computer-architecture', 'multiprocessing']
  },
  {
    number: 25,
    answer: 'D',
    pageNumber: 3,
    topic: 'CPU 組成',
    stem: '下列何者非屬 CPU 的組成元件？',
    options: { A: 'ALU', B: 'control unit', C: 'Register', D: 'SRAM' },
    tags: ['computer-architecture', 'cpu']
  },
  {
    number: 26,
    answer: 'C',
    pageNumber: 3,
    topic: '16-QAM 與 QPSK',
    stem: '在相同符號率(baud)下，16-QAM 的資料率相對 QPSK 的倍數為何？',
    options: { A: '0.5 倍', B: '1 倍', C: '2 倍', D: '4 倍' },
    tags: ['networking', 'modulation']
  },
  {
    number: 27,
    answer: 'A',
    pageNumber: 3,
    topic: '路由表聚合',
    stem: '有關路由表聚合，57.6.96.0/21、57.6.104.0/21、57.6.112.0/21、57.6.120.0/21 聚合結果為何？',
    options: { A: '57.6.96.0/19', B: '57.6.96.0/18', C: '57.6.0.0/17', D: '57.6.96.0/16' },
    tags: ['networking', 'cidr']
  },
  {
    number: 28,
    answer: 'D',
    pageNumber: 3,
    topic: 'TCP 流量控制',
    stem: 'TCP 的「流量控制」主要為避免下列何種情況？',
    options: { A: '擁塞崩潰', B: '連線飢餓', C: 'RTT 上升', D: '接收端緩衝溢位' },
    tags: ['networking', 'tcp']
  },
  {
    number: 29,
    answer: 'A',
    pageNumber: 3,
    topic: 'Wi-Fi 省電',
    stem: '無線 Power Saving 的典型做法(以 Wi-Fi 為例)，未涉及下列何者？',
    options: {
      A: 'STP BPDU 省電',
      B: '以 TIM/Beacon 引導喚醒接收',
      C: '以 ARP 抑制睡眠',
      D: 'TWT(Target Wake Time)或 Legacy PS(PS-Poll)'
    },
    tags: ['networking', 'wifi']
  },
  {
    number: 30,
    answer: 'A',
    pageNumber: 3,
    topic: 'IP 分片',
    stem: 'MTU=1500B、IP Header=20B，若發送 2300B 負載，會產生幾個 IP 片段？',
    options: { A: '2', B: '3', C: '4', D: '5' },
    tags: ['networking', 'ip']
  },
  {
    number: 31,
    answer: 'C',
    pageNumber: 3,
    topic: 'PMTUD',
    stem: '若設定 DF=1 而路徑 MTU 低於封包大小，PMTUD 的關鍵回饋機制為何？',
    options: {
      A: 'TCP RST',
      B: '路由器回 ICMP Time Exceeded',
      C: '路由器回 ICMP Fragmentation Needed',
      D: 'ARP'
    },
    tags: ['networking', 'icmp']
  },
  {
    number: 32,
    answer: 'B',
    pageNumber: 3,
    topic: 'ping 與 traceroute',
    stem: '有關 ping 與 traceroute 的主要差異，下列何者正確？',
    options: {
      A: '前者測路徑、後者測延遲',
      B: '前者測可達性，後者推路徑節點',
      C: '前者用 TCP，後者用 UDP',
      D: '前者應用層，後者傳輸層'
    },
    tags: ['networking', 'diagnostics']
  },
  {
    number: 33,
    answer: 'A',
    pageNumber: 3,
    topic: 'CSMA/CD',
    stem: '乙太網路 CSMA/CD 在碰撞後避免再次碰撞的機制為何？',
    options: { A: '二元指數退避', B: '令牌傳遞', C: 'TDMA', D: 'RTS/CTS' },
    tags: ['networking', 'ethernet']
  },
  {
    number: 34,
    answer: 'B',
    pageNumber: 3,
    topic: '全雙工乙太網路',
    stem: '以交換器(switch)全雙工連線的乙太網路，網卡傳送時是否仍會線上碰撞？',
    options: {
      A: '會',
      B: '不會(全雙工/點對點消除碰撞域)',
      C: '只在半雙工會',
      D: '只在 VLAN 間會'
    },
    tags: ['networking', 'ethernet']
  },
  {
    number: 35,
    answer: 'A',
    pageNumber: 4,
    topic: 'Wi-Fi 隱藏節點',
    stem: 'Wi-Fi 隱藏節點問題常用下列何種流程緩解？',
    options: { A: 'RTS/CTS/ACK', B: 'CSMA/CD', C: '令牌環', D: 'MIMO' },
    tags: ['networking', 'wifi']
  },
  {
    number: 36,
    answer: 'B',
    pageNumber: 4,
    topic: 'HTTP 無狀態與 Cookies',
    stem: 'HTTP 為「無狀態」，若需維持使用者狀態，常用下列何種方法？',
    options: { A: 'ARP Cache', B: 'Cookies', C: 'NAT', D: 'STP' },
    tags: ['networking', 'http']
  },
  {
    number: 37,
    answer: 'D',
    pageNumber: 4,
    topic: 'DNS iterative query',
    stem: '有關 DNS iterative query 的敘述，下列何者正確？',
    options: {
      A: '由根伺服器遞迴解到底',
      B: '回應永遠權威',
      C: '使用 TCP 53',
      D: '由客戶端逐層查詢，伺服器回應「下一位詢問誰」資訊'
    },
    tags: ['networking', 'dns']
  },
  {
    number: 38,
    answer: 'C',
    pageNumber: 4,
    topic: 'DNS Open Resolver',
    stem: '下列何者非屬 DNS Open Resolver 弱點的風險？',
    options: {
      A: '被濫用為 DDoS 放大器',
      B: '洩漏內部解析紀錄',
      C: '導致 HTTPS 中間人攻擊自動成功',
      D: '被用於偵測內部名稱'
    },
    tags: ['networking', 'dns-security']
  },
  {
    number: 39,
    answer: 'B',
    pageNumber: 4,
    topic: 'DDoS 黑洞/水坑',
    stem: '常見 DDoS 防護中，「黑洞/水坑(Blackholing/Sinkholing)」的主要目的為何？',
    options: {
      A: '加密流量',
      B: '將惡意流量導走/收容解析',
      C: '建立零信任',
      D: '啟用多因素驗證'
    },
    tags: ['networking', 'ddos']
  },
  {
    number: 40,
    answer: 'A',
    pageNumber: 4,
    topic: '負載平衡演算法',
    stem: '下列何者為負載平衡 Round Robin 與 Weighted Round Robin 的差異？',
    options: {
      A: '是否考量伺服器權重',
      B: '是否支援 SSL 終結',
      C: '是否支援 L7 規則',
      D: '是否支援健康檢查'
    },
    tags: ['networking', 'load-balancing']
  },
  {
    number: 41,
    answer: 'D',
    pageNumber: 4,
    topic: 'Session Stickiness',
    stem: '為避免使用者會話在多台伺服器間漂移造成異常，下列何者為常見作法？',
    options: { A: 'HSTS', B: 'HPKP', C: 'OCSP Stapling', D: 'Session Stickiness' },
    tags: ['networking', 'session']
  },
  {
    number: 42,
    answer: 'D',
    pageNumber: 4,
    topic: 'SQL Injection 防護',
    stem: 'SQL Injection 防護中，下列何者為預備語句(Prepared Statements)的關鍵？',
    options: {
      A: '將變數轉成 16 進位',
      B: '全局 Try/Catch',
      C: '對輸入做 Base64',
      D: 'SQL 與資料綁定分離、參數化'
    },
    tags: ['security', 'sql-injection']
  },
  {
    number: 43,
    answer: 'A',
    pageNumber: 4,
    topic: '5G 特性',
    stem: '相較於 4G，下列何者非屬 5G 常見特性？',
    options: { A: '覆蓋率下降', B: '頻譜效率提升', C: '延遲顯著降低', D: '大量裝置連結' },
    tags: ['networking', 'mobile-network']
  },
  {
    number: 44,
    answer: 'B',
    pageNumber: 4,
    topic: 'IAM 與 RBAC',
    stem: '有關 IAM 與 RBAC 的關係，下列敘述何者正確？',
    options: {
      A: 'IAM ⊂ RBAC',
      B: 'RBAC ⊂ IAM(RBAC 是授權方式之一)',
      C: '無關',
      D: 'RBAC=IAM'
    },
    tags: ['security', 'access-control']
  },
  {
    number: 45,
    answer: 'D',
    pageNumber: 4,
    topic: '兩步驟驗證',
    stem: '兩步驟驗證(Two-Step Verification)主要提升下列哪個面向？',
    options: { A: '可用性', B: '完整性', C: '不可否認性', D: '機密性與認證強度' },
    tags: ['security', 'authentication']
  },
  {
    number: 46,
    answer: 'D',
    pageNumber: 4,
    topic: 'IDPS 偵測技術',
    stem: 'IDPS 偵測技術中，下列何者對「未知攻擊」一般表現最佳？',
    options: {
      A: '特徵偵測(Signature)',
      B: '自動掃描(Auto Scanning)',
      C: '狀態協定分析(Stateful Protocol)',
      D: '異常行為(Anomaly)'
    },
    tags: ['security', 'idps']
  },
  {
    number: 47,
    answer: 'C',
    pageNumber: 4,
    topic: 'Session Hijacking',
    stem: '下列何者非屬 Session Hijacking 常見取得會話的手段？',
    options: { A: 'MITM', B: 'Sniffing', C: 'UDP 檔案傳輸', D: 'XSS' },
    tags: ['security', 'session-hijacking']
  },
  {
    number: 48,
    answer: 'B',
    pageNumber: 4,
    topic: 'WAF 與傳統防火牆',
    stem: '下列何者為 WAF 與傳統封包過濾式防火牆的主要差異？',
    options: {
      A: 'WAF 僅看第 2 層',
      B: 'WAF 檢視與過濾應用層內容/命令',
      C: 'WAF 不做代理',
      D: 'WAF 不支援 SSL'
    },
    tags: ['security', 'firewall']
  },
  {
    number: 49,
    answer: 'C',
    pageNumber: 4,
    topic: '多因子認證',
    stem: '多因子認證不包含下列何種要素？',
    options: { A: '所知之事', B: '所持之物', C: '所在之處', D: '所表之徵' },
    tags: ['security', 'authentication']
  },
  {
    number: 50,
    answer: 'D',
    pageNumber: 4,
    topic: '網路層通訊協定',
    stem: '下列何者非屬 TCP/IP 網路中之網路層通訊協定？',
    options: { A: 'ICMP', B: 'IGMP', C: 'OSPF', D: 'UDP' },
    tags: ['networking', 'tcp-ip']
  }
];

function createOptionExplanations(raw: RawQuestion): FourOptionRecord {
  return ANSWER_OPTIONS.reduce((explanations, option) => {
    explanations[option] =
      option === raw.answer
        ? `${option} 是 PDF 題本標示的答案；解題時要回到「${raw.topic}」的定義、流程或公式判斷。`
        : `${option} 不是 PDF 題本標示的答案；複習時要比較它和「${raw.topic}」正確條件的差異。`;

    return explanations;
  }, {} as FourOptionRecord);
}

function mergeTags(rawTags: readonly string[], reviewTags: readonly string[] = []): string[] {
  return [...new Set([...rawTags, ...reviewTags])];
}

function createQuestion(raw: RawQuestion): ExamQuestionAnalysis {
  const review = reviewedQuestionAnalyses[raw.number];

  return {
    year: '114',
    number: raw.number,
    acceptedAnswers: [raw.answer],
    answerNote: review?.answerNote ?? 'PDF 題本已標示官方答案，後續逐題內容審查會補強完整推導。',
    answerVerification: review?.answerVerification ?? 'needs-review',
    originalStem: raw.stem,
    options: raw.options,
    coreTerms: review?.coreTerms ?? [raw.topic],
    beginnerExplanation:
      review?.beginnerExplanation ?? `本題先辨識考點「${raw.topic}」，再逐一檢查四個選項是否符合題幹要求。`,
    solvingSteps: review?.solvingSteps ?? [
      '讀出題幹要求的判斷目標。',
      `把判斷目標對應到「${raw.topic}」的核心定義或運作條件。`,
      `以 PDF 題本標示答案 ${raw.answer} 作為官方答案基準，再檢查其他選項的干擾點。`
    ],
    optionExplanations: review?.optionExplanations ?? createOptionExplanations(raw),
    keyTakeaways: review?.keyTakeaways ?? [`本題核心考點是「${raw.topic}」。`],
    tags: mergeTags(raw.tags, review?.tags),
    sourceRef: {
      year: '114',
      fileName: '114.pdf',
      pageNumber: raw.pageNumber,
      extractionStatus: 'needs-review'
    }
  };
}

export const questions: ExamQuestionAnalysis[] = rawQuestions.map(createQuestion);
