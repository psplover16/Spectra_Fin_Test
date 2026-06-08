# Stage 3 Source Synthesis: 國文、英文

## Scope

第三階段來源資料夾：`_private/國文、英文/`

本階段依 tasks 要求，在第一階段與第二階段完成後處理語言來源。每個來源檔建立至少一個副代理工作項，並為「語言」建立科目整併工作項；整併時再分為國文作文與英文題型兩個工作項，以降低內容混雜。副代理僅讀指定 PDF 或依已收來源報告整併，未修改檔案，且未讀取受限私人筆記路徑。

## Source File Work Items

| Work item | Source file | Agent | Extraction status | Key output |
| --- | --- | --- | --- | --- |
| stage-3-107-source-agent | `107國營事業新進職員-國文、英文.pdf` | `019ea826-34a4-7851-a6f4-4511c134c57e` | 可抽取但需校對 | 作文新科技提升經營績效；英文語境字彙、連接詞、關代、假設語氣、克漏字、禮儀文明閱讀 |
| stage-3-108-source-agent | `108國營事業新進職員-共同科目(國文、英文).pdf` | `019ea826-48be-7391-955d-78a6d279e4ed` | 可抽取但需校對 | 作文投資臺灣環境；英文字彙、讓步/目的子句、片語、智慧財產權/野火克漏字、有機食品閱讀 |
| stage-3-109-source-agent | `109國營事業新進職員-國文、英文.pdf` | `019ea826-5d0a-7f43-a6ea-c1ed3901fa05` | 可抽取，部分 OCR 補足 | 作文提升自我在企業組織中的價值；英文關代、倒裝、假設語氣、認證制度/心理學克漏字、社群偏誤閱讀 |
| stage-3-110-source-agent | `110國營事業新進職員-國文、英文.pdf` | `019ea826-7123-7503-b670-dcc685c04413` | 可抽取但需校對 | 作文 ESG 機會與挑戰；英文片語、idioms、被動、mandative subjunctive、Peace Corps/自制力克漏字、love chemistry 閱讀 |
| stage-3-111-source-agent | `111國營事業新進職員-國文、英文.pdf` | `019ea826-8547-7ac1-b9e7-643c461441ea` | 可抽取但需校對 | 作文企業韌性；英文 V-ing、不定詞、主謂一致、假設倒裝、反菸/失眠克漏字、創傷後成長閱讀 |
| stage-3-112-source-agent | `112國營事業新進職員-國文、英文.pdf` | `019ea826-995c-7751-b788-10af2e35bdd9` | 可抽取但需校對 | 作文 AI 浪潮；英文完成進行式、關係子句、Should/Only if 倒裝、節慶消費/mind-mapping 克漏字、wave power 閱讀 |

## Consolidation: 國文作文

整併後高頻主軸：

- 科技轉型與營運績效：AI、大數據、IoT、雲端、區塊鏈、智慧客服、預測性維修、流程再造與資料治理。
- 國家政策與公共任務：供電、水資源、能源穩定、綠能、投資臺灣、臺商回流與基礎建設。
- ESG、永續與企業韌性：氣候變遷、淨零、利害關係人、公司治理、風險辨識、內控、危機調適與復原。
- 員工自我成長與組織價值：專業累積、終身學習、團隊合作、主動負責、職涯規劃與人機協作。

已反映到 `src/modules/exam/data/subjectContent.ts` 的 `language`：

- `highFrequencyPoints`: `language-composition-public`, `language-composition-technology`, `language-composition-esg-resilience`, `language-english-grammar`, `language-english-vocabulary-cloze`, `language-english-reading`
- `lectureSections`: `language-composition-framework-lecture`, `language-composition-technology-lecture`, `language-composition-esg-resilience-lecture`, `language-english-grammar-lecture`, `language-english-vocabulary-cloze-lecture`, `language-english-reading-lecture`
- `questionMappings`: 包含國文作文題型、英文關係子句/倒裝、克漏字與閱讀題型對照

## Consolidation: 英文題型

整併後高頻主軸：

- 核心文法反覆考：關係代名詞、whose、some of which、假設語氣、Should/Only if 倒裝、mandative subjunctive、分詞、V-ing、動名詞、不定詞。
- 語境字彙辨義：抽象名詞、學術動詞、社會議題詞、環境能源詞、健康心理詞與能力判斷詞。
- 介系詞、片語動詞與慣用語：keep up with、lay off、stand someone up、on the ball、more than meets the eye、one way or another 等需回到語境。
- 克漏字與閱讀：健康心理、環境能源、社會制度、消費文化、科技倫理、食品健康、心理偏誤、創傷成長與再生能源。

## Review Notes

- 所有年份來源皆回報 PDF 文字層或答案符號需人工校對，尤其英文 A/B/C/D 選項、答案標記、斷字與私用字元；因此前端內容維持 `kind: topic-mapping` 與 `verificationStatus: needs-review`。
- 國文作文題名已依副代理報告整理為主題型講義，不把補教擬答逐字轉為正式內容。
- 英文題目只整理考點、題型與解題策略，不建立正式答案鍵。

## Content Review

- 國文答案唯一性審查：作文不作為單一答案題，而以審題、素材、分論點與結論回扣作為學習內容；避免把參考範文當成唯一標準答案。
- 英文答案唯一性審查：關係子句、倒裝、分詞、片語、克漏字與閱讀皆以「判斷線索」呈現，來源答案未校對前不轉成正式測驗題。
- 解析支撐審查：語言科新增章節提供作文審題框架、ESG/AI/韌性素材、文法解題順序、克漏字上下文策略與閱讀題型辨識，足以支撐考前複習。
- 干擾選項審查：前端題目對照以跨科錯配與常見語法誤判作為干擾項，能區分概念邊界，且保留來源檔案與校對狀態。
