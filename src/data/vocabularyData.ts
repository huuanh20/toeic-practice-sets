export interface VocabItem {
  id: number;
  testId: number;
  word: string;
  pos: string;
  pronunciation: string;
  meaning: string;
  storyId: number;
  storyTitle: string;
  englishContext?: string;
  vietnameseContext?: string;
}

export const vocabularyData: VocabItem[] = [
  // Story 1: Thử thách và cơ hội (Challenge and Opportunity)
  {
    id: 1,
    testId: 3,
    word: "productivity",
    pos: "noun",
    pronunciation: "/ˌproʊ.dəkˈtɪv.ə.t̬i/",
    meaning: "năng suất",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Để tăng productivity tổng thể, công ty đang cố gắng giúp nhân viên mới làm quen nhanh hơn."
  },
  {
    id: 2,
    testId: 3,
    word: "accustomed to",
    pos: "adjective phrase",
    pronunciation: "/əˈkʌs.təmd tuː/",
    meaning: "quen với",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Công ty đang cố gắng giúp nhân viên mới accustomed to môi trường làm việc nhanh hơn."
  },
  {
    id: 3,
    testId: 3,
    word: "structured orientation",
    pos: "noun phrase",
    pronunciation: "/ˈstrʌk.tʃɚd ˌɔːr.i.enˈteɪ.ʃən/",
    meaning: "chương trình định hướng có cấu trúc",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Giúp nhân viên mới làm quen thông qua một chương trình structured orientation chặt chẽ."
  },
  {
    id: 4,
    testId: 3,
    word: "are not entitled",
    pos: "verb phrase",
    pronunciation: "/ɪnˈtaɪ.t̬əld/",
    meaning: "không được quyền / không được phép",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Theo chính sách mới, các thực tập sinh are not entitled làm các nhiệm vụ quan trọng."
  },
  {
    id: 5,
    testId: 3,
    word: "substantive assignments",
    pos: "noun phrase",
    pronunciation: "/səbˈstæn.t̬ɪv əˈsaɪn.mənts/",
    meaning: "nhiệm vụ quan trọng, thực chất",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Thực tập sinh không được làm các substantive assignments cho đến khi quen dần."
  },
  {
    id: 6,
    testId: 3,
    word: "protocols",
    pos: "noun",
    pronunciation: "/ˈproʊ.t̬ə.kɑːlz/",
    meaning: "các quy trình / nghi thức",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Không được làm nhiệm vụ lớn cho đến khi họ quen dần với protocols và quy trình vận hành."
  },
  {
    id: 7,
    testId: 3,
    word: "operational procedures",
    pos: "noun phrase",
    pronunciation: "/ˌɑː.pəˈreɪ.ʃən.əl prəˈsiː.dʒɚz/",
    meaning: "quy trình vận hành",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Cho đến khi họ quen dần với các quy trình và operational procedures."
  },
  {
    id: 8,
    testId: 3,
    word: "manufacturing industry",
    pos: "noun phrase",
    pronunciation: "/ˌmæn.jəˈfæk.tʃɚ.ɪŋ ˈɪn.də.stri/",
    meaning: "ngành sản xuất",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Trong lĩnh vực manufacturing industry, bộ phận nhân sự nhận được nhiều đơn ứng tuyển."
  },
  {
    id: 9,
    testId: 3,
    word: "appeal",
    pos: "noun",
    pronunciation: "/əˈpiːl/",
    meaning: "sức hấp dẫn",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Nhiều đơn ứng tuyển được nộp, cho thấy sự appeal của ngành đối với lực lượng lao động."
  },
  {
    id: 10,
    testId: 3,
    word: "declined",
    pos: "verb (past tense)",
    pronunciation: "/dɪˈklaɪnd/",
    meaning: "suy giảm / từ chối",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Số lượng thành viên trong trung tâm cộng đồng đã declined đáng kể."
  },
  {
    id: 11,
    testId: 3,
    word: "ratio",
    pos: "noun",
    pronunciation: "/ˈreɪ.ʃi.oʊ/",
    meaning: "tỉ lệ",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Thành viên giảm đáng kể do sự gia tăng về ratio phí thành viên hàng năm."
  },
  {
    id: 12,
    testId: 3,
    word: "necessitate",
    pos: "verb",
    pronunciation: "/nəˈses.ə.t̬eɪt/",
    meaning: "đòi hỏi, yêu cầu / bắt phải có",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Sự sụt giảm này đã necessitate một cuộc họp để đánh giá lại cơ cấu giá."
  },
  {
    id: 13,
    testId: 3,
    word: "re-evaluate",
    pos: "verb",
    pronunciation: "/ˌriː.ɪˈvæl.ju.eɪt/",
    meaning: "đánh giá lại",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Đòi hỏi một cuộc họp đột xuất để re-evaluate cơ cấu giá phí."
  },
  {
    id: 14,
    testId: 3,
    word: "competitive",
    pos: "adjective",
    pronunciation: "/kəmˈpet̬.ə.t̬ɪv/",
    meaning: "có tính cạnh tranh",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Mặc dù có những khó khăn về nhân sự và áp lực competitive..."
  },
  {
    id: 15,
    testId: 3,
    word: "booming economy",
    pos: "noun phrase",
    pronunciation: "/ˈbuː.mɪŋ ɪˈkɑː.nə.mi/",
    meaning: "nền kinh tế phát triển mạnh / bùng nổ",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Nhờ nền booming economy hiện tại giúp hãng hàng không kỳ vọng mở thêm tuyến bay mới."
  },
  {
    id: 16,
    testId: 3,
    word: "anticipates",
    pos: "verb",
    pronunciation: "/ænˈtɪs.ə.peɪts/",
    meaning: "dự đoán, kỳ vọng",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Nền kinh tế bùng nổ giúp hãng hàng không anticipates mở thêm các tuyến bay mới."
  },
  {
    id: 17,
    testId: 3,
    word: "transatlantic",
    pos: "adjective",
    pronunciation: "/ˌtræn.zətˈlæn.t̬ɪk/",
    meaning: "xuyên Đại Tây Dương",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Hãng hàng không mong muốn mở thêm các tuyến transatlantic mới."
  },
  {
    id: 18,
    testId: 3,
    word: "strategic expansion",
    pos: "noun phrase",
    pronunciation: "/strəˈtiː.dʒɪk ɪkˈspæn.ʃən/",
    meaning: "mở rộng chiến lược",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Đây là một strategic expansion được tạo điều kiện bởi nhu cầu người tiêu dùng."
  },
  {
    id: 19,
    testId: 3,
    word: "facilitated",
    pos: "verb (past tense)",
    pronunciation: "/fəˈsɪl.ə.teɪ.t̬ɪd/",
    meaning: "được tạo điều kiện / hỗ trợ",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Mở rộng chiến lược được facilitated bởi sự gia tăng của nhu cầu tiêu dùng."
  },
  {
    id: 20,
    testId: 3,
    word: "consumer demand",
    pos: "noun phrase",
    pronunciation: "/kənˈsuː.mɚ dɪˈmænd/",
    meaning: "nhu cầu người tiêu dùng",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Sự mở rộng được hỗ trợ bởi sự gia tăng của consumer demand."
  },
  {
    id: 21,
    testId: 3,
    word: "favorable conditions",
    pos: "noun phrase",
    pronunciation: "/ˈfeɪ.vɚ.ə.bəl kənˈdɪʃ.ənz/",
    meaning: "điều kiện thuận lợi",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Sự phát triển nhờ vào nhu cầu và favorable conditions hiện tại."
  },
  {
    id: 22,
    testId: 3,
    word: "secure",
    pos: "verb",
    pronunciation: "/səˈkjʊr/",
    meaning: "đảm bảo, giành được / an toàn",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Ban giám đốc đang đàm phán để secure các lượt cất/hạ cánh tại sân bay lớn."
  },
  {
    id: 23,
    testId: 3,
    word: "slots",
    pos: "noun",
    pronunciation: "/slɑːts/",
    meaning: "khung giờ cất/hạ cánh / vị trí",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Đàm phán để giành được các slots tại các sân bay quốc tế lớn."
  },
  {
    id: 24,
    testId: 3,
    word: "external",
    pos: "adjective",
    pronunciation: "/ɪkˈstɜː.nəl/",
    meaning: "bên ngoài / ngoại cảnh",
    storyId: 1,
    storyTitle: "Thử thách và cơ hội",
    englishContext: "Tuy nhiên, một số vấn đề external lại đang diễn ra ở địa phương."
  },

  // Story 2: Lỗi hợp đồng và chi phí (Contract Errors and Costs)
  {
    id: 25,
    testId: 3,
    word: "violate",
    pos: "verb",
    pronunciation: "/ˈvaɪ.ə.leɪt/",
    meaning: "vi phạm",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Hóa đơn của ông Templeton đang violate các điều khoản được quy định trong hợp đồng."
  },
  {
    id: 26,
    testId: 3,
    word: "stipulated",
    pos: "verb (past participle)",
    pronunciation: "/ˈstɪp.jə.leɪ.t̬ɪd/",
    meaning: "được quy định / thỏa thuận",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Vi phạm các điều khoản được stipulated trong hợp đồng thuê nhà."
  },
  {
    id: 27,
    testId: 3,
    word: "vacate premises",
    pos: "verb phrase",
    pronunciation: "/veɪˈkeɪt ˈprem.ɪ.sɪz/",
    meaning: "rời khỏi tài sản/địa điểm / trả mặt bằng",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Họ muốn vacate premises quá sớm so với thỏa thuận ban đầu."
  },
  {
    id: 28,
    testId: 3,
    word: "initial agreement",
    pos: "noun phrase",
    pronunciation: "/ɪˈnɪʃ.əl əˈɡriː.mənt/",
    meaning: "thỏa thuận ban đầu",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Việc chuyển đi diễn ra sớm hơn so với initial agreement."
  },
  {
    id: 29,
    testId: 3,
    word: "forfeit",
    pos: "verb",
    pronunciation: "/ˈfɔːr.fɪt/",
    meaning: "mất quyền, bị tịch thu / phạt",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Vì sự vi phạm này, ông ấy có nguy cơ forfeit khoản tiền cọc."
  },
  {
    id: 30,
    testId: 3,
    word: "security deposit",
    pos: "noun phrase",
    pronunciation: "/səˈkjʊr.ə.t̬i dɪˈpɑː.zɪt/",
    meaning: "tiền đặt cọc / bảo đảm",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Nguy cơ bị mất khoản security deposit do vi phạm thời hạn hợp đồng."
  },
  {
    id: 31,
    testId: 3,
    word: "inspected",
    pos: "verb (past participle)",
    pronunciation: "/ɪnˈspekt.tɪd/",
    meaning: "được kiểm tra",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Tất cả căn hộ phải được inspected một cách kỹ lưỡng trước khi chuyển đi."
  },
  {
    id: 32,
    testId: 3,
    word: "thoroughly",
    pos: "adverb",
    pronunciation: "/ˈθɝː.ə.li/",
    meaning: "một cách kỹ lưỡng / triệt để",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Căn hộ cần được kiểm tra thoroughly để đánh giá hư hại."
  },
  {
    id: 33,
    testId: 3,
    word: "assess",
    pos: "verb",
    pronunciation: "/əˈses/",
    meaning: "đánh giá",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Kiểm tra căn hộ để assess bất kỳ thiệt hại nào trước khi chuyển đi."
  },
  {
    id: 34,
    testId: 3,
    word: "prior to",
    pos: "preposition",
    pronunciation: "/ˈpraɪ.ɚ tuː/",
    meaning: "trước khi",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Cần đánh giá các hư hỏng prior to lúc người thuê chuyển đi."
  },
  {
    id: 35,
    testId: 3,
    word: "verification",
    pos: "noun",
    pronunciation: "/ˌver.ə.fəˈkeɪ.ʃən/",
    meaning: "xác minh / kiểm chứng",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Ngân hàng gặp khó khăn trong việc verification danh tính của khách hàng."
  },
  {
    id: 36,
    testId: 3,
    word: "preempt",
    pos: "verb",
    pronunciation: "/priːˈempt/",
    meaning: "ngăn chặn, phòng ngừa trước",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Xác minh danh tính nhằm preempt việc khách hàng bị đánh cắp danh tính."
  },
  {
    id: 37,
    testId: 3,
    word: "identity theft",
    pos: "noun phrase",
    pronunciation: "/aɪˈden.t̬ə.t̬i theft/",
    meaning: "đánh cắp danh tính",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Quy trình nghiêm ngặt được áp dụng để tránh identity theft."
  },
  {
    id: 38,
    testId: 3,
    word: "stringent",
    pos: "adjective",
    pronunciation: "/ˈstrɪn.dʒənt/",
    meaning: "nghiêm ngặt / khắt khe",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Buộc phải áp dụng các quy trình bảo mật và kiểm soát stringent."
  },
  {
    id: 39,
    testId: 3,
    word: "reimbursed",
    pos: "verb (past tense)",
    pronunciation: "/ˌriː.ɪmˈbɝːst/",
    meaning: "hoàn lại tiền / bồi hoàn",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Các khách hàng bị ảnh hưởng đã được reimbursed đầy đủ số tiền."
  },
  {
    id: 40,
    testId: 3,
    word: "formal request",
    pos: "noun phrase",
    pronunciation: "/ˈfɔːr.məl rɪˈkwest/",
    meaning: "yêu cầu chính thức",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Số tiền được hoàn sau khi họ gửi formal request."
  },
  {
    id: 41,
    testId: 3,
    word: "supporting documentation",
    pos: "noun phrase",
    pronunciation: "/səˈpɔːr.t̬ɪŋ ˌdɑː.kjə.menˈteɪ.ʃən/",
    meaning: "tài liệu chứng minh / hỗ trợ",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Yêu cầu hoàn trả cần gửi kèm formal request và supporting documentation."
  },
  {
    id: 42,
    testId: 3,
    word: "conflict",
    pos: "noun",
    pronunciation: "/ˈkɑːn.flɪkt/",
    meaning: "xung đột / mâu thuẫn",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Để tránh conflict và cải thiện hiệu quả tổng thể."
  },
  {
    id: 43,
    testId: 3,
    word: "overall efficiency",
    pos: "noun phrase",
    pronunciation: "/ˌoʊ.vɚˈɑːl ɪˈfɪʃ.ən.si/",
    meaning: "hiệu quả tổng thể",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Hành động này giúp tránh mâu thuẫn và tăng overall efficiency."
  },
  {
    id: 44,
    testId: 3,
    word: "mandate",
    pos: "noun",
    pronunciation: "/ˈmæn.deɪt/",
    meaning: "chỉ thị, yêu cầu / ủy thác",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Ban quản lý cấp cao đưa ra mandate yêu cầu cải thiện giao tiếp."
  },
  {
    id: 45,
    testId: 3,
    word: "coordination",
    pos: "noun",
    pronunciation: "/koʊˌɔːr.dənˈeɪ.ʃən/",
    meaning: "sự phối hợp / điều phối",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Việc thiếu sự coordination đã dẫn đến hiểu lầm thường xuyên."
  },
  {
    id: 46,
    testId: 3,
    word: "misunderstandings",
    pos: "noun",
    pronunciation: "/ˌmɪs.ʌn.dɚˈstæn.dɪŋz/",
    meaning: "hiểu lầm",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Thiếu phối hợp gây ra các misunderstandings và làm chậm tiến độ."
  },
  {
    id: 47,
    testId: 3,
    word: "interdepartmental cooperation",
    pos: "noun phrase",
    pronunciation: "/ˌɪn.t̬ɚ.diːˌpɑːrt.ˈmen.t̬əl koʊˌɑː.pəˈreɪ.ʃən/",
    meaning: "sự hợp tác giữa các phòng ban",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Chương trình đào tạo mới về interdepartmental cooperation đã được triển khai."
  },
  {
    id: 48,
    testId: 3,
    word: "implemented",
    pos: "verb (past tense)",
    pronunciation: "/ˈɪm.plə.ment.ɪd/",
    meaning: "được triển khai / thực hiện",
    storyId: 2,
    storyTitle: "Lỗi hợp đồng và chi phí",
    englishContext: "Khóa đào tạo kỹ năng đã được implemented ngay lập tức."
  },

  // Story 3: Dịch vụ khách hàng (Customer Service)
  {
    id: 49,
    testId: 3,
    word: "itinerary",
    pos: "noun",
    pronunciation: "/aɪˈtɪn.ə.rer.i/",
    meaning: "lịch trình / hành trình",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Kevin cần xem qua itinerary một cách tỉ mỉ trước chuyến đi."
  },
  {
    id: 50,
    testId: 3,
    word: "meticulous",
    pos: "adjective",
    pronunciation: "/məˈtɪk.jə.ləs/",
    meaning: "tỉ mỉ, kỹ lượng / tỉ mỉ",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Anh ấy xem xét lịch trình du lịch một cách meticulous."
  },
  {
    id: 51,
    testId: 3,
    word: "departs",
    pos: "verb",
    pronunciation: "/dɪˈpɑːrts/",
    meaning: "khởi hành",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Đảm bảo đến sân bay 3 tiếng trước khi máy bay departs."
  },
  {
    id: 52,
    testId: 3,
    word: "punctuality",
    pos: "noun",
    pronunciation: "/ˌpʌŋk.tʃuˈæl.ə.t̬i/",
    meaning: "sự đúng giờ",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Trong các công việc công tác quốc tế, sự punctuality là tối quan trọng."
  },
  {
    id: 53,
    testId: 3,
    word: "paramount",
    pos: "adjective",
    pronunciation: "/ˈpær.ə.maʊnt/",
    meaning: "tối quan trọng / tột bậc",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Đối với sự kiện này, việc đúng giờ và chuyên nghiệp là paramount."
  },
  {
    id: 54,
    testId: 3,
    word: "convention",
    pos: "noun",
    pronunciation: "/kənˈven.ʃən/",
    meaning: "hội nghị / quy ước",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Trong suốt convention, anh ấy cần cư xử lịch sự để đại diện cho hãng."
  },
  {
    id: 55,
    testId: 3,
    word: "potential clients",
    pos: "noun phrase",
    pronunciation: "/pəˈten.ʃəl ˈklaɪ.ənts/",
    meaning: "khách hàng tiềm năng",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Anh ấy tích cực giao lưu nhằm kết nối hiệu quả với các potential clients."
  },
  {
    id: 56,
    testId: 3,
    word: "former",
    pos: "adjective",
    pronunciation: "/ˈfɔːr.mɚ/",
    meaning: "cựu / trước đây",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Cô Paula Daniels, một former nhân viên của chúng tôi..."
  },
  {
    id: 57,
    testId: 3,
    word: "excelled",
    pos: "verb (past tense)",
    pronunciation: "/ɪkˈseld/",
    meaning: "xuất sắc / vượt trội",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Trước đó, cô ấy đã excelled trong công việc và được đồng nghiệp quý mến."
  },
  {
    id: 58,
    testId: 3,
    word: "unanimously",
    pos: "adverb",
    pronunciation: "/juːˈnæn.ə.məs.li/",
    meaning: "nhất trí, đồng lòng",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Cô ấy được đề cử và đồng nghiệp yêu mến unanimously."
  },
  {
    id: 59,
    testId: 3,
    word: "benchmark",
    pos: "noun",
    pronunciation: "/ˈbentʃ.mɑːrk/",
    meaning: "chuẩn mực, tiêu chuẩn / điểm mốc",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Thành tích của cô ấy đóng vai trò làm benchmark cho toàn bộ nhân viên mới."
  },
  {
    id: 60,
    testId: 3,
    word: "steep discounts",
    pos: "noun phrase",
    pronunciation: "/stiːp ˈdɪs.kaʊnts/",
    meaning: "giảm giá mạnh / kịch sàn",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Cửa hàng sách địa phương đang quảng cáo một đợt steep discounts."
  },
  {
    id: 61,
    testId: 3,
    word: "liquidate",
    pos: "verb",
    pronunciation: "/ˈlɪk.wə.deɪt/",
    meaning: "thanh lý / giải thể",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Họ thực hiện giảm giá mạnh để liquidate toàn bộ hàng tồn kho cũ."
  },
  {
    id: 62,
    testId: 3,
    word: "discrepancy",
    pos: "noun",
    pronunciation: "/dɪˈskrep.ən.si/",
    meaning: "sự chênh lệch, sai lệch",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Họ cũng cam kết đền bù nếu có bất kỳ discrepancy nào trong đơn hàng."
  },
  {
    id: 63,
    testId: 3,
    word: "compensation",
    pos: "noun",
    pronunciation: "/ˌkɑːm.penˈseɪ.ʃən/",
    meaning: "đền bù / bồi thường",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Khách hàng sẽ nhận được khoản compensation ngay lập tức nếu đơn hàng lỗi."
  },
  {
    id: 64,
    testId: 3,
    word: "identical",
    pos: "adjective",
    pronunciation: "/aɪˈden.t̬ɪ.kəl/",
    meaning: "giống hệt / đồng nhất",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Khách hàng có thể đổi lấy ghế identical nếu sự kiện bị hoãn."
  },
  {
    id: 65,
    testId: 3,
    word: "franchise",
    pos: "noun",
    pronunciation: "/ˈfræn.tʃaɪz/",
    meaning: "thương hiệu nhượng quyền",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Thương hiệu franchise mới về đồ nướng đã chính thức khai trương."
  },
  {
    id: 66,
    testId: 3,
    word: "opened its doors",
    pos: "verb phrase",
    pronunciation: "/ˈoʊ.pənd ɪts dɔːrz/",
    meaning: "chính thức mở cửa / khai trương",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Nhà hàng lẩu nướng franchise mới chính thức opened its doors tuần trước."
  },
  {
    id: 67,
    testId: 3,
    word: "interest",
    pos: "noun",
    pronunciation: "/ˈɪn.trəst/",
    meaning: "sự quan tâm / hứng thú",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Nhà hàng nhận được nhiều sự interest và phản hồi tích cực từ công chúng."
  },
  {
    id: 68,
    testId: 3,
    word: "positive feedback",
    pos: "noun phrase",
    pronunciation: "/ˈpɑː.zə.t̬ɪv ˈfiːd.bæk/",
    meaning: "phản hồi tích cực",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Nhà hàng nhận được nhiều đánh giá cao và positive feedback."
  },
  {
    id: 69,
    testId: 3,
    word: "profitability",
    pos: "noun",
    pronunciation: "/ˌprɑː.fɪ.t̬əˈbɪl.ə.t̬i/",
    meaning: "khả năng sinh lời",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Phản hồi tốt báo hiệu tiềm năng profitability cao của thương hiệu."
  },
  {
    id: 70,
    testId: 3,
    word: "network",
    pos: "verb",
    pronunciation: "/ˈnet.wɜːrk/",
    meaning: "kết nối / thiết lập mối quan hệ",
    storyId: 3,
    storyTitle: "Dịch vụ khách hàng",
    englishContext: "Anh ấy cần trò chuyện và network hiệu quả với đối tác."
  }
  ,{
    id: 71,
    testId: 1,
    word: "comprehensive checkup",
    pos: "noun phrase",
    pronunciation: "/ˌkɒmprɪˈhensɪv ˈtʃekʌp/",
    meaning: "kiểm tra sức khỏe toàn diện",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "Phòng khám đã nỗ lực sắp xếp cho ông Lee một buổi comprehensive checkup định kỳ, vốn là một prerequisite theo chính sách bảo hiểm mới."
  }
  ,{
    id: 72,
    testId: 1,
    word: "prerequisite",
    pos: "noun",
    pronunciation: "/priːˈrekwəzɪt/",
    meaning: "điều kiện tiên quyết",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "Phòng khám đã nỗ lực sắp xếp cho ông Lee một buổi comprehensive checkup định kỳ, vốn là một prerequisite theo chính sách bảo hiểm mới."
  }
  ,{
    id: 73,
    testId: 1,
    word: "aware of",
    pos: "adjective phrase",
    pronunciation: "/əˈweər əv/",
    meaning: "nhận thức về",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "Tuy nhiên, tình huống đã trở nên phức tạp vì ông Lee không aware of sự mandatory của quy trình mới..."
  }
  ,{
    id: 74,
    testId: 1,
    word: "mandatory",
    pos: "adjective",
    pronunciation: "/ˈmændətəri/",
    meaning: "bắt buộc",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "Tuy nhiên, tình huống đã trở nên phức tạp vì ông Lee không aware of sự mandatory của quy trình mới..."
  }
  ,{
    id: 75,
    testId: 1,
    word: "stipulating",
    pos: "verb (V-ing)",
    pronunciation: "/ˈstɪpjuleɪtɪŋ/",
    meaning: "quy định, nêu rõ",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "...quy trình mới stipulating rằng tất cả paperwork phải được submitted promptly trước 48 giờ."
  }
  ,{
    id: 76,
    testId: 1,
    word: "submitted",
    pos: "verb",
    pronunciation: "/səbˈmɪtɪd/",
    meaning: "nộp, gửi",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "...tất cả paperwork phải được submitted promptly trước 48 giờ."
  }
  ,{
    id: 77,
    testId: 1,
    word: "promptly",
    pos: "adverb",
    pronunciation: "/ˈprɒmptli/",
    meaning: "kịp thời, nhanh chóng",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "...tất cả paperwork phải được submitted promptly trước 48 giờ."
  }
  ,{
    id: 78,
    testId: 1,
    word: "subsequently",
    pos: "adverb",
    pronunciation: "/ˈsʌbsɪkwəntli/",
    meaning: "sau đó, tiếp theo",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "Subsequently, bà Jenkins, thư ký phụ trách, đã cố gắng liên hệ với ông Lee regarding việc này."
  }
  ,{
    id: 79,
    testId: 1,
    word: "regarding",
    pos: "preposition",
    pronunciation: "/rɪˈɡɑːdɪŋ/",
    meaning: "về, liên quan đến",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "Subsequently, bà Jenkins, thư ký phụ trách, đã cố gắng liên hệ với ông Lee regarding việc này."
  }
  ,{
    id: 80,
    testId: 1,
    word: "correspondence",
    pos: "noun",
    pronunciation: "/ˌkɒrəˈspɒndəns/",
    meaning: "thư từ, sự liên lạc qua email/thư",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "Bà đã gửi một correspondence qua email và reiterate yêu cầu..."
  }
  ,{
    id: 81,
    testId: 1,
    word: "reiterate",
    pos: "verb",
    pronunciation: "/riˈɪtəreɪt/",
    meaning: "nhắc lại, lặp lại",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "Bà đã gửi một correspondence qua email và reiterate yêu cầu..."
  }
  ,{
    id: 82,
    testId: 1,
    word: "irrelevant",
    pos: "adjective",
    pronunciation: "/ɪˈreləvənt/",
    meaning: "không liên quan",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "...ông Lee lại gửi một email hoàn toàn irrelevant hỏi về việc availability..."
  }
  ,{
    id: 83,
    testId: 1,
    word: "availability",
    pos: "noun",
    pronunciation: "/əˌveɪləˈbɪləti/",
    meaning: "sự sẵn có",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "...hỏi về việc availability và mức rental fee của conference room..."
  }
  ,{
    id: 84,
    testId: 1,
    word: "rental fee",
    pos: "noun phrase",
    pronunciation: "/ˈrentl fiː/",
    meaning: "phí thuê",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "...hỏi về việc availability và mức rental fee của conference room..."
  }
  ,{
    id: 85,
    testId: 1,
    word: "negligence",
    pos: "noun",
    pronunciation: "/ˈneglɪdʒəns/",
    meaning: "sự sơ suất",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "Sự negligence này đã tạo ra một disruption đáng kể..."
  }
  ,{
    id: 86,
    testId: 1,
    word: "disruption",
    pos: "noun",
    pronunciation: "/dɪsˈrʌpʃn/",
    meaning: "sự gián đoạn",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "Sự negligence này đã tạo ra một disruption đáng kể..."
  }
  ,{
    id: 87,
    testId: 1,
    word: "postpone",
    pos: "verb",
    pronunciation: "/pəʊstˈpəʊn/",
    meaning: "hoãn",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "...phòng khám không có lựa chọn nào khác ngoài việc postpone lịch hẹn."
  }
  ,{
    id: 88,
    testId: 1,
    word: "inconvenience",
    pos: "noun",
    pronunciation: "/ˌɪnkənˈviːniəns/",
    meaning: "sự bất tiện",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "Đây là một inconvenience không chỉ cho ông Lee mà còn ảnh hưởng đến sự efficiency..."
  }
  ,{
    id: 89,
    testId: 1,
    word: "efficiency",
    pos: "noun",
    pronunciation: "/ɪˈfɪʃnsi/",
    meaning: "hiệu suất, sự hiệu quả",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "Đây là một inconvenience không chỉ cho ông Lee mà còn ảnh hưởng đến sự efficiency..."
  }
  ,{
    id: 90,
    testId: 1,
    word: "apologizing for",
    pos: "verb phrase",
    pronunciation: "/əˈpɒlədʒaɪzɪŋ fɔː/",
    meaning: "xin lỗi về",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "Phòng khám đã gửi một thông báo apologizing for sự nhầm lẫn..."
  }
  ,{
    id: 91,
    testId: 1,
    word: "confirm",
    pos: "verb",
    pronunciation: "/kənˈfɜːm/",
    meaning: "xác nhận",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "...và yêu cầu ông Lee confirm việc nộp đủ hồ sơ..."
  }
  ,{
    id: 92,
    testId: 1,
    word: "due course",
    pos: "noun phrase",
    pronunciation: "/djuː kɔːs/",
    meaning: "thời hạn thích hợp / đúng tiến độ",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "...nộp đủ hồ sơ trong due course để reschedule cuộc hẹn."
  }
  ,{
    id: 93,
    testId: 1,
    word: "reschedule",
    pos: "verb",
    pronunciation: "/riːˈskedʒuːl/",
    meaning: "sắp xếp lại lịch",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "...nộp đủ hồ sơ trong due course để reschedule cuộc hẹn."
  }
  ,{
    id: 94,
    testId: 1,
    word: "late fee",
    pos: "noun phrase",
    pronunciation: "/leɪt fiː/",
    meaning: "phí trễ hạn",
    storyId: 1,
    storyTitle: "Khủng hoảng lịch hẹn ở phòng khám",
    englishContext: "Ông Lee sẽ phải đối mặt với một khoản late fee theo quy định."
  }
  ,{
    id: 95,
    testId: 1,
    word: "renovated",
    pos: "verb",
    pronunciation: "/ˈrenəveɪtɪd/",
    meaning: "cải tạo",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "Tòa nhà sau khi được renovated đã thể hiện điểm số efficiency được cải thiện vastly..."
  }
  ,{
    id: 96,
    testId: 1,
    word: "efficiency",
    pos: "noun",
    pronunciation: "/ɪˈfɪʃnsi/",
    meaning: "hiệu suất",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "Tòa nhà sau khi được renovated đã thể hiện điểm số efficiency được cải thiện vastly..."
  }
  ,{
    id: 97,
    testId: 1,
    word: "vastly",
    pos: "adverb",
    pronunciation: "/ˈvɑːstli/",
    meaning: "rõ rệt, rất nhiều",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "Tòa nhà sau khi được renovated đã thể hiện điểm số efficiency được cải thiện vastly..."
  }
  ,{
    id: 98,
    testId: 1,
    word: "specifications",
    pos: "noun",
    pronunciation: "/ˌspesɪfɪˈkeɪʃnz/",
    meaning: "thông số kỹ thuật",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "...đáp ứng các specifications được yêu cầu."
  }
  ,{
    id: 99,
    testId: 1,
    word: "indicates",
    pos: "verb",
    pronunciation: "/ˈɪndɪkeɪts/",
    meaning: "chỉ ra",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "Các báo cáo indicates rằng chi phí vận hành đã giảm significantly."
  }
  ,{
    id: 100,
    testId: 1,
    word: "significantly",
    pos: "adverb",
    pronunciation: "/sɪɡˈnɪfɪkəntli/",
    meaning: "đáng kể",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "Các báo cáo indicates rằng chi phí vận hành đã giảm significantly."
  }
  ,{
    id: 101,
    testId: 1,
    word: "comprehensive maintenance",
    pos: "noun phrase",
    pronunciation: "/ˌkɒmprɪˈhensɪv ˈmeɪntənəns/",
    meaning: "bảo trì toàn diện",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "Tuy nhiên, trước ngày khai trương chính thức, ban quản lý nhận thấy cần có một đợt comprehensive maintenance..."
  }
  ,{
    id: 102,
    testId: 1,
    word: "optimal",
    pos: "adjective",
    pronunciation: "/ˈɒptɪməl/",
    meaning: "tối ưu",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "...để đảm bảo mọi thứ đều optimal."
  }
  ,{
    id: 103,
    testId: 1,
    word: "unavailability",
    pos: "noun",
    pronunciation: "/ˌʌnəˌveɪləˈbɪləti/",
    meaning: "sự không khả dụng",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "Sự cố đầu tiên là thang máy rơi vào tình trạng unavailability tạm thời."
  }
  ,{
    id: 104,
    testId: 1,
    word: "rigorous inspection",
    pos: "noun phrase",
    pronunciation: "/ˈrɪɡərəs ɪnˈspekʃn/",
    meaning: "kiểm tra nghiêm ngặt",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "Bộ phận kỹ thuật đã tiến hành rigorous inspection do lo ngại..."
  }
  ,{
    id: 105,
    testId: 1,
    word: "extensive repair work",
    pos: "noun phrase",
    pronunciation: "/ɪkˈtensɪv rɪˈpeə wɜːk/",
    meaning: "sửa chữa chuyên sâu",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "...lo ngại về khả năng cần extensive repair work."
  }
  ,{
    id: 106,
    testId: 1,
    word: "suspension",
    pos: "noun",
    pronunciation: "/səˈspenʃn/",
    meaning: "sự tạm ngưng",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "Sự suspension hoạt động này đã gây ra inconvenience nhỏ..."
  }
  ,{
    id: 107,
    testId: 1,
    word: "inconvenience",
    pos: "noun",
    pronunciation: "/ˌɪnkənˈviːniəns/",
    meaning: "sự bất tiện",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "Sự suspension hoạt động này đã gây ra inconvenience nhỏ, nhưng đó là điều inevitable."
  }
  ,{
    id: 108,
    testId: 1,
    word: "inevitable",
    pos: "adjective",
    pronunciation: "/ɪnˈevɪtəbl/",
    meaning: "không thể tránh khỏi",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "Sự suspension hoạt động này đã gây ra inconvenience nhỏ, nhưng đó là điều inevitable."
  }
  ,{
    id: 109,
    testId: 1,
    word: "partial",
    pos: "adjective",
    pronunciation: "/ˈpɑːʃl/",
    meaning: "một phần",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "Tình hình trở nên nghiêm trọng hơn khi phát hiện ra rằng thiệt hại kết cấu chỉ là partial..."
  }
  ,{
    id: 110,
    testId: 1,
    word: "severe",
    pos: "adjective",
    pronunciation: "/sɪˈvɪə(r)//",
    meaning: "nghiêm trọng",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "...nhưng một vết nứt severe đã xuất hiện trên dầm chịu lực chính."
  }
  ,{
    id: 111,
    testId: 1,
    word: "superficial",
    pos: "adjective",
    pronunciation: "/ˌsuːpəˈfɪʃl/",
    meaning: "bề ngoài, không sâu",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "Các kỹ sư trưởng đã xác nhận đây không phải là vấn đề superficial mà là một structural integrity issue."
  }
  ,{
    id: 112,
    testId: 1,
    word: "structural integrity issue",
    pos: "noun phrase",
    pronunciation: "/ˈstrʌktʃərəl ɪnˈteɡrəti ˈɪʃuː/",
    meaning: "vấn đề về tính toàn vẹn cấu trúc",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "Các kỹ sư trưởng đã xác nhận đây không phải là vấn đề superficial mà là một structural integrity issue."
  }
  ,{
    id: 113,
    testId: 1,
    word: "deficiency",
    pos: "noun",
    pronunciation: "/dɪˈfɪʃnsi/",
    meaning: "thiếu sót",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "Để khắc phục deficiency này, một giải pháp kỹ thuật đòi hỏi..."
  }
  ,{
    id: 114,
    testId: 1,
    word: "state-of-the-art",
    pos: "adjective",
    pronunciation: "/ˌsteɪt əv ði ˈɑːt/",
    meaning: "hiện đại nhất",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "...đòi hỏi phải sử dụng công nghệ state-of-the-art và các vật liệu bền."
  }
  ,{
    id: 115,
    testId: 1,
    word: "prior to",
    pos: "preposition",
    pronunciation: "/ˈpraɪə tuː/",
    meaning: "trước khi",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "...đảm bảo việc sửa chữa diễn ra prior to sự kiện khai trương."
  }
  ,{
    id: 116,
    testId: 1,
    word: "committed to",
    pos: "adjective phrase",
    pronunciation: "/kəˈmɪtɪd tuː/",
    meaning: "cam kết",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "Mặc dù có những thử thách này, đội ngũ vẫn committed to hoàn thành công việc đúng thời hạn..."
  }
  ,{
    id: 117,
    testId: 1,
    word: "exemplary",
    pos: "adjective",
    pronunciation: "/ɪɡˈzempləri/",
    meaning: "mang tính hình mẫu",
    storyId: 2,
    storyTitle: "Dự án cải tạo kỹ thuật cao cấp",
    englishContext: "...đảm bảo tòa nhà sẽ là một exemplary về kỹ thuật hiện đại."
  }
  ,{
    id: 118,
    testId: 1,
    word: "acquisition",
    pos: "noun",
    pronunciation: "/ˌækwɪˈzɪʃn/",
    meaning: "thương vụ mua lại",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "Mặc dù thương vụ acquisition gần đây đã được successfully completed..."
  }
  ,{
    id: 119,
    testId: 1,
    word: "successfully completed",
    pos: "verb phrase",
    pronunciation: "/səkˈsesfəli kəmˈpliːtɪd/",
    meaning: "hoàn tất thành công",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "Mặc dù thương vụ acquisition gần đây đã được successfully completed..."
  }
  ,{
    id: 120,
    testId: 1,
    word: "internal",
    pos: "adjective",
    pronunciation: "/ɪnˈtɜːnl/",
    meaning: "nội bộ",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "...công ty vẫn đối mặt với một vài rắc rối internal đáng kể."
  }
  ,{
    id: 121,
    testId: 1,
    word: "unsubstantiated",
    pos: "adjective",
    pronunciation: "/ˌʌnsəbˈstænʃieɪtɪd/",
    meaning: "không có căn cứ",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "Một vài unsubstantiated rumors đang lan truyền trong toàn bộ organization..."
  }
  ,{
    id: 122,
    testId: 1,
    word: "rumors",
    pos: "noun",
    pronunciation: "/ˈruːmə(r)z/",
    meaning: "tin đồn",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "Một vài unsubstantiated rumors đang lan truyền trong toàn bộ organization..."
  }
  ,{
    id: 123,
    testId: 1,
    word: "organization",
    pos: "noun",
    pronunciation: "/ˌɔːɡənaɪˈzeɪʃn/",
    meaning: "tổ chức",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "Một vài unsubstantiated rumors đang lan truyền trong toàn bộ organization..."
  }
  ,{
    id: 124,
    testId: 1,
    word: "funds management",
    pos: "noun phrase",
    pronunciation: "/fʌndz ˈmænɪdʒmənt/",
    meaning: "quản lý quỹ",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "...về việc funds management không hiệu quả."
  }
  ,{
    id: 125,
    testId: 1,
    word: "employee morale",
    pos: "noun phrase",
    pronunciation: "/ɪmˈplɔɪiː məˈrɑːl/",
    meaning: "tinh thần nhân viên",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "Điều này đã làm suy giảm employee morale..."
  }
  ,{
    id: 126,
    testId: 1,
    word: "necessitated",
    pos: "verb (past)",
    pronunciation: "/nəˈsesɪteɪtɪd/",
    meaning: "đòi hỏi, khiến phải",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "...và necessitated một cuộc họp khẩn cấp để address sự lo ngại."
  }
  ,{
    id: 127,
    testId: 1,
    word: "address",
    pos: "verb",
    pronunciation: "/əˈdres/",
    meaning: "giải quyết",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "...và necessitated một cuộc họp khẩn cấp để address sự lo ngại."
  }
  ,{
    id: 128,
    testId: 1,
    word: "formal complaints",
    pos: "noun phrase",
    pronunciation: "/ˈfɔːml kəmˈpleɪnts/",
    meaning: "khiếu nại chính thức",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "Song song đó, một khách hàng quan trọng đã nộp formal complaints..."
  }
  ,{
    id: 129,
    testId: 1,
    word: "updated statement",
    pos: "noun phrase",
    pronunciation: "/ˈʌpdeɪtɪd ˈsteɪtmənt/",
    meaning: "bản sao kê cập nhật",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "...sau khi nhận được updated statement của mình..."
  }
  ,{
    id: 130,
    testId: 1,
    word: "anticipated",
    pos: "adjective",
    pronunciation: "/ænˈtɪsɪpeɪtɪd/",
    meaning: "dự đoán, mong đợi",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "...cho rằng tổng số tiền cao hơn mức anticipated."
  }
  ,{
    id: 131,
    testId: 1,
    word: "authorize",
    pos: "verb",
    pronunciation: "/ˈɔːθəraɪz/",
    meaning: "ủy quyền",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "Anh ta khăng khăng rằng anh không hề authorize các khoản phí phụ thêm..."
  }
  ,{
    id: 132,
    testId: 1,
    word: "explanation",
    pos: "noun",
    pronunciation: "/ˌekspləˈneɪʃn/",
    meaning: "lời giải thích",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "...và yêu cầu một lời explanation immediately."
  }
  ,{
    id: 133,
    testId: 1,
    word: "immediately",
    pos: "adverb",
    pronunciation: "/ɪˈmiːdiətli/",
    meaning: "ngay lập tức",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "...và yêu cầu một lời explanation immediately."
  }
  ,{
    id: 134,
    testId: 1,
    word: "seriously",
    pos: "adverb",
    pronunciation: "/ˈsɪəriəsli/",
    meaning: "một cách nghiêm túc",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "Vụ việc được xử lý seriously và đội ngũ..."
  }
  ,{
    id: 135,
    testId: 1,
    word: "investigation",
    pos: "noun",
    pronunciation: "/ɪnˌvestɪˈɡeɪʃn/",
    meaning: "cuộc điều tra",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "...đội ngũ dịch vụ khách hàng đang tiến hành investigation để xác định..."
  }
  ,{
    id: 136,
    testId: 1,
    word: "discrepancy",
    pos: "noun",
    pronunciation: "/dɪˈskrepənsi/",
    meaning: "sự chênh lệch, sai lệch",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "...để xác định discrepancy về tài chính này."
  }
  ,{
    id: 137,
    testId: 1,
    word: "cast a ballot",
    pos: "verb phrase",
    pronunciation: "/kɑːst ə ˈbælət/",
    meaning: "bỏ phiếu",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "Hội đồng thành phố đang chuẩn bị cast a ballot về một loại thuế mới..."
  }
  ,{
    id: 138,
    testId: 1,
    word: "adversely affect",
    pos: "verb phrase",
    pronunciation: "/ˈædvɜːsli əˈfekt/",
    meaning: "ảnh hưởng tiêu cực",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "...có thể adversely affect đến lợi nhuận."
  }
  ,{
    id: 139,
    testId: 1,
    word: "stringent regulation",
    pos: "noun phrase",
    pronunciation: "/ˈstrɪndʒənt ˌreɡjuˈleɪʃn/",
    meaning: "quy định nghiêm ngặt",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "Hơn nữa, một stringent regulation mới về bán beverage đã được officially adopted."
  }
  ,{
    id: 140,
    testId: 1,
    word: "officially adopted",
    pos: "verb phrase",
    pronunciation: "/əˈfɪʃəli əˈdɒptɪd/",
    meaning: "được thông qua chính thức",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "Hơn nữa, một stringent regulation mới về bán beverage đã được officially adopted."
  }
  ,{
    id: 141,
    testId: 1,
    word: "currently reviewing",
    pos: "verb phrase",
    pronunciation: "/ˈkʌrəntli rɪˈvjuːɪŋ/",
    meaning: "đang xem xét",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "Bộ phận pháp lý đang currently reviewing các văn bản..."
  }
  ,{
    id: 142,
    testId: 1,
    word: "full compliance",
    pos: "noun phrase",
    pronunciation: "/fʊl kəmˈplaɪəns/",
    meaning: "tuân thủ đầy đủ",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "...để đảm bảo công ty đạt được full compliance với tất cả các điều luật mới..."
  }
  ,{
    id: 143,
    testId: 1,
    word: "mitigate",
    pos: "verb",
    pronunciation: "/ˈmɪtɪɡeɪt/",
    meaning: "giảm thiểu",
    storyId: 3,
    storyTitle: "Thông báo và giải quyết sai sót",
    englishContext: "...nhằm mitigate mọi rủi ro pháp lý tiềm ẩn."
  }
  ,{
    id: 144,
    testId: 2,
    word: "unforeseen event",
    pos: "noun phrase",
    pronunciation: "/ˌʌn.fɔː'siːn ɪ'vent/",
    meaning: "sự kiện không lường trước",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "Do một unforeseen event, ông Nelson... đã phải disrupt công việc của mình."
  }
  ,{
    id: 145,
    testId: 2,
    word: "disrupt",
    pos: "verb",
    pronunciation: "/dɪsˈrʌpt/",
    meaning: "gián đoạn",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "Do một unforeseen event, ông Nelson... đã phải disrupt công việc của mình."
  }
  ,{
    id: 146,
    testId: 2,
    word: "promptly",
    pos: "adverb",
    pronunciation: "/ˈprɒmpt.li/",
    meaning: "ngay lập tức, kịp thời",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "Ông Nelson đã promptly thông báo rằng ông phải undergo a surgical procedure..."
  }
  ,{
    id: 147,
    testId: 2,
    word: "undergo a surgical procedure",
    pos: "verb phrase",
    pronunciation: "/ˌʌn.dərˈɡoʊ ə 'sɜː.dʒɪ.kəl prə'siː.dʒər/",
    meaning: "trải qua một ca phẫu thuật",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "Ông đã promptly thông báo rằng ông phải undergo a surgical procedure khẩn cấp..."
  }
  ,{
    id: 148,
    testId: 2,
    word: "unable to",
    pos: "adjective phrase",
    pronunciation: "/ʌn'eɪ.bəl tuː/",
    meaning: "không thể",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "...và sẽ unable to thực hiện job duties vào tuần tới."
  }
  ,{
    id: 149,
    testId: 2,
    word: "job duties",
    pos: "noun phrase",
    pronunciation: "/dʒɒb 'djuː.tiz/",
    meaning: "nhiệm vụ công việc",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "...và sẽ unable to thực hiện job duties vào tuần tới."
  }
  ,{
    id: 150,
    testId: 2,
    word: "propose",
    pos: "verb",
    pronunciation: "/prəˈpəʊz/",
    meaning: "đề xuất",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "Với tình trạng này, ông propose xin một leave of absence..."
  }
  ,{
    id: 151,
    testId: 2,
    word: "leave of absence",
    pos: "noun phrase",
    pronunciation: "/liːv əv 'æb.səns/",
    meaning: "nghỉ phép tạm thời",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "Với tình trạng này, ông propose xin một leave of absence kéo dài hai tuần..."
  }
  ,{
    id: 152,
    testId: 2,
    word: "essential",
    pos: "adjective",
    pronunciation: "/ɪ'sen.ʃəl/",
    meaning: "thiết yếu",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "...đồng thời đảm bảo sẽ bàn giao các tài liệu essential cho đồng nghiệp..."
  }
  ,{
    id: 153,
    testId: 2,
    word: "impact",
    pos: "noun",
    pronunciation: "/ˈɪm.pækt/",
    meaning: "tác động",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "...để giảm thiểu sự impact đến tiến độ dự án."
  }
  ,{
    id: 154,
    testId: 2,
    word: "Acquisitions Department",
    pos: "noun phrase",
    pronunciation: "/æk.wɪ'zɪʃ.ənz dɪ'pɑːt.mənt/",
    meaning: "bộ phận thu mua",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "Song song với thách thức về nhân sự này, bộ phận Acquisitions Department đang phải đối mặt..."
  }
  ,{
    id: 155,
    testId: 2,
    word: "numerous",
    pos: "adjective",
    pronunciation: "/'njuː.mər.əs/",
    meaning: "nhiều",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "...đang phải đối mặt với numerous complaints từ nhân viên."
  }
  ,{
    id: 156,
    testId: 2,
    word: "complaints",
    pos: "noun",
    pronunciation: "/kəm'pleɪnts/",
    meaning: "lời phàn nàn",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "...đang phải đối mặt với numerous complaints từ nhân viên."
  }
  ,{
    id: 157,
    testId: 2,
    word: "strict dress code",
    pos: "noun phrase",
    pronunciation: "/strɪkt dres kəʊd/",
    meaning: "quy tắc trang phục nghiêm ngặt",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "Nguồn cơn của sự bất mãn là quy tắc strict dress code vừa được implement vào đầu tháng."
  }
  ,{
    id: 158,
    testId: 2,
    word: "implement",
    pos: "verb",
    pronunciation: "/ˈɪm.plɪ.ment/",
    meaning: "thực thi, áp dụng",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "Nguồn cơn của sự bất mãn là quy tắc strict dress code vừa được implement vào đầu tháng."
  }
  ,{
    id: 159,
    testId: 2,
    word: "reluctant",
    pos: "adjective",
    pronunciation: "/rɪˈlʌk.tənt/",
    meaning: "miễn cưỡng",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "Nhiều nhân viên bày tỏ sự reluctant khi tuân theo những yêu cầu mới này..."
  }
  ,{
    id: 160,
    testId: 2,
    word: "contending",
    pos: "verb (present participle)",
    pronunciation: "/kən'ten.dɪŋ/",
    meaning: "cho rằng, lập luận rằng",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "...contending rằng quy tắc đó quá restrictive và không cần thiết..."
  }
  ,{
    id: 161,
    testId: 2,
    word: "restrictive",
    pos: "adjective",
    pronunciation: "/rɪ'strɪk.tɪv/",
    meaning: "mang tính hạn chế",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "...contending rằng quy tắc đó quá restrictive và không cần thiết..."
  }
  ,{
    id: 162,
    testId: 2,
    word: "reviewing",
    pos: "verb (present participle)",
    pronunciation: "/rɪ'vjuː.ɪŋ/",
    meaning: "xem xét lại",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "Quản lý nhân sự hiện đang reviewing cả hai vấn đề."
  }
  ,{
    id: 163,
    testId: 2,
    word: "approve",
    pos: "verb",
    pronunciation: "/ə'pruːv/",
    meaning: "phê duyệt",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "Họ phải nhanh chóng approve yêu cầu nghỉ phép của ông Nelson..."
  }
  ,{
    id: 164,
    testId: 2,
    word: "mediate",
    pos: "verb",
    pronunciation: "/'miː.di.eɪt/",
    meaning: "hòa giải",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "...đồng thời phải tìm cách mediate giữa ban quản lý và nhân viên..."
  }
  ,{
    id: 165,
    testId: 2,
    word: "scheduled",
    pos: "adjective/verb",
    pronunciation: "/ˈʃed.juːld/",
    meaning: "được lên lịch",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "Một cuộc họp toàn bộ bộ phận đã được scheduled để address concerns..."
  }
  ,{
    id: 166,
    testId: 2,
    word: "address concerns",
    pos: "verb phrase",
    pronunciation: "/ə'dres kən'sɜːnz/",
    meaning: "giải quyết các mối lo ngại",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "Một cuộc họp toàn bộ bộ phận đã được scheduled để address concerns..."
  }
  ,{
    id: 167,
    testId: 2,
    word: "compromise",
    pos: "noun/verb",
    pronunciation: "/ˈkɒm.prə.maɪz/",
    meaning: "thỏa hiệp",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "...và tìm ra một giải pháp compromise có thể được mutually chấp thuận."
  }
  ,{
    id: 168,
    testId: 2,
    word: "mutually",
    pos: "adverb",
    pronunciation: "/'mjuː.tʃu.ə.li/",
    meaning: "lẫn nhau, song phương",
    storyId: 1,
    storyTitle: "Sự cố hành chính",
    englishContext: "...và tìm ra một giải pháp compromise có thể được mutually chấp thuận."
  }
  ,{
    id: 169,
    testId: 2,
    word: "annual fiscal review",
    pos: "noun phrase",
    pronunciation: "/ˈæn.ju.əl ˈfɪs.kəl rɪˈvjuː/",
    meaning: "cuộc đánh giá tài chính hằng năm",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "Sau annual fiscal review, ban lãnh đạo công ty nhận thấy..."
  }
  ,{
    id: 170,
    testId: 2,
    word: "expenditures",
    pos: "noun",
    pronunciation: "/ɪkˈspen.dɪ.tʃərz/",
    meaning: "chi phí",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "...nhận thấy expenditures đang ở mức exorbitantly cao..."
  }
  ,{
    id: 171,
    testId: 2,
    word: "exorbitantly",
    pos: "adverb",
    pronunciation: "/ɪɡˈzɔː.bɪ.tənt.li/",
    meaning: "một cách quá mức, cắt cổ",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "...nhận thấy expenditures đang ở mức exorbitantly cao..."
  }
  ,{
    id: 172,
    testId: 2,
    word: "reduce",
    pos: "verb",
    pronunciation: "/rɪˈdjuːs/",
    meaning: "giảm",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "...và cần phải reduce chúng một cách drastic."
  }
  ,{
    id: 173,
    testId: 2,
    word: "drastically",
    pos: "adverb",
    pronunciation: "/ˈdræs.tɪ.kəli/",
    meaning: "mạnh, quyết liệt",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "...và cần phải reduce chúng một cách drastic."
  }
  ,{
    id: 174,
    testId: 2,
    word: "virtually",
    pos: "adverb",
    pronunciation: "/ˈvɜː.tʃu.ə.li/",
    meaning: "hầu như",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "Virtually tất cả các thành viên đều đồng ý rằng..."
  }
  ,{
    id: 175,
    testId: 2,
    word: "priority",
    pos: "noun",
    pronunciation: "/praɪˈɒr.ə.ti/",
    meaning: "ưu tiên",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "...đồng ý rằng priority hàng đầu là phải conserve năng lượng..."
  }
  ,{
    id: 176,
    testId: 2,
    word: "conserve",
    pos: "verb",
    pronunciation: "/kənˈsɜːv/",
    meaning: "tiết kiệm, bảo tồn",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "...đồng ý rằng priority hàng đầu là phải conserve năng lượng..."
  }
  ,{
    id: 177,
    testId: 2,
    word: "heating system",
    pos: "noun phrase",
    pronunciation: "/ˈhiː.tɪŋ ˌsɪs.təm/",
    meaning: "hệ thống sưởi",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "...ví dụ như tắt heating system sau 6 giờ tối..."
  }
  ,{
    id: 178,
    testId: 2,
    word: "yield",
    pos: "verb",
    pronunciation: "/jiːld/",
    meaning: "tạo ra, đem lại",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "...một biện pháp được kỳ vọng sẽ yield significant savings."
  }
  ,{
    id: 179,
    testId: 2,
    word: "significant savings",
    pos: "noun phrase",
    pronunciation: "/sɪɡˈnɪf.ɪ.kənt 'seɪ.vɪŋz/",
    meaning: "khoản tiết kiệm đáng kể",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "...một biện pháp được kỳ vọng sẽ yield significant savings."
  }
  ,{
    id: 180,
    testId: 2,
    word: "internal transfer",
    pos: "noun phrase",
    pronunciation: "/ɪnˈtɜː.nəl 'træns.fɜː/",
    meaning: "chuyển công tác nội bộ",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "Trong khi đó, các cuộc đàm phán internal transfer trong công ty..."
  }
  ,{
    id: 181,
    testId: 2,
    word: "coherently",
    pos: "adverb",
    pronunciation: "/kəʊˈhɪə.rənt.li/",
    meaning: "mạch lạc, trôi chảy",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "...diễn ra coherently và smoothly..."
  }
  ,{
    id: 182,
    testId: 2,
    word: "smoothly",
    pos: "adverb",
    pronunciation: "/ˈsmuːð.li/",
    meaning: "suôn sẻ",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "...diễn ra coherently và smoothly..."
  }
  ,{
    id: 183,
    testId: 2,
    word: "efficacy",
    pos: "noun",
    pronunciation: "/ˈef.ɪ.kə.si/",
    meaning: "hiệu quả",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "...thể hiện sự efficacy trong cơ cấu quản lý nhân sự."
  }
  ,{
    id: 184,
    testId: 2,
    word: "interest rates",
    pos: "noun",
    pronunciation: "/ˈɪn.trəst reɪts/",
    meaning: "lãi suất",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "Cùng lúc đó, tin tức tích cực lan truyền: interest rates đã tăng lên substantially..."
  }
  ,{
    id: 185,
    testId: 2,
    word: "substantially",
    pos: "adverb",
    pronunciation: "/səbˈstæn.ʃəl.i/",
    meaning: "đáng kể",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "Cùng lúc đó, tin tức tích cực lan truyền: interest rates đã tăng lên substantially..."
  }
  ,{
    id: 186,
    testId: 2,
    word: "outstanding",
    pos: "adjective",
    pronunciation: "/aʊtˈstæn.dɪŋ/",
    meaning: "nổi bật, xuất sắc",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "...nhờ đánh giá outstanding mà công ty nhận được..."
  }
  ,{
    id: 187,
    testId: 2,
    word: "bolster",
    pos: "verb",
    pronunciation: "/ˈbəʊl.stər/",
    meaning: "củng cố, tăng cường",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "Điều này đã bolster financial stability của công ty trên thị trường."
  }
  ,{
    id: 188,
    testId: 2,
    word: "financial stability",
    pos: "noun phrase",
    pronunciation: "/faɪˈnæn.ʃəl stəˈbɪl.ɪ.ti/",
    meaning: "sự ổn định tài chính",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "Điều này đã bolster financial stability của công ty trên thị trường."
  }
  ,{
    id: 189,
    testId: 2,
    word: "dictates",
    pos: "verb",
    pronunciation: "/ˈdɪk.teɪts/",
    meaning: "quy định, yêu cầu",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "Chính sách của công ty dictates rằng..."
  }
  ,{
    id: 190,
    testId: 2,
    word: "consequently",
    pos: "adverb",
    pronunciation: "/ˈkɒn.sɪ.kwənt.li/",
    meaning: "do đó, vì vậy",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "...nếu một khách hàng gặp khó khăn tài chính và consequently hóa đơn..."
  }
  ,{
    id: 191,
    testId: 2,
    word: "settled",
    pos: "adjective/verb (pp)",
    pronunciation: "/ˈset.əld/",
    meaning: "được thanh toán",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "...hóa đơn điện chưa được settled, họ sẽ bị chuyển qua..."
  }
  ,{
    id: 192,
    testId: 2,
    word: "collection agency",
    pos: "noun phrase",
    pronunciation: "/kəˈlek.ʃən ˌeɪ.dʒən.si/",
    meaning: "cơ quan thu hồi nợ",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "...họ sẽ bị chuyển qua collection agency sau một designated period."
  }
  ,{
    id: 193,
    testId: 2,
    word: "designated period",
    pos: "noun phrase",
    pronunciation: "/ˈdez.ɪɡ.neɪ.tɪd 'pɪə.ri.əd/",
    meaning: "khoảng thời gian được chỉ định",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "...họ sẽ bị chuyển qua collection agency sau một designated period."
  }
  ,{
    id: 194,
    testId: 2,
    word: "profitability",
    pos: "noun",
    pronunciation: "/ˌprɒf.ɪ.təˈbɪl.ɪ.ti/",
    meaning: "khả năng sinh lợi",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "Công ty cần balance giữa việc duy trì profitability và..."
  }
  ,{
    id: 195,
    testId: 2,
    word: "goodwill",
    pos: "noun",
    pronunciation: "/ˌɡʊdˈwɪl/",
    meaning: "thiện chí",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "...và duy trì sự goodwill với khách hàng..."
  }
  ,{
    id: 196,
    testId: 2,
    word: "payment extension options",
    pos: "noun phrase",
    pronunciation: "/ˈpeɪ.mənt ɪk'sten.ʃən 'ɒp.ʃənz/",
    meaning: "lựa chọn gia hạn thanh toán",
    storyId: 2,
    storyTitle: "Quyết định chi tiêu",
    englishContext: "...bằng cách đưa ra các payment extension options cho những trường hợp đặc biệt."
  }
  ,{
    id: 197,
    testId: 2,
    word: "devastated",
    pos: "adjective",
    pronunciation: "/ˈdev.ə.steɪ.tɪd/",
    meaning: "bị tàn phá, bị phá hủy nghiêm trọng",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "Arlington Civic Center đã bị devastated bởi một trận hỏa hoạn..."
  }
  ,{
    id: 198,
    testId: 2,
    word: "undergo",
    pos: "verb",
    pronunciation: "/ˌʌn.dərˈɡoʊ/",
    meaning: "trải qua, chịu đựng",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "...và phải undergo extensive renovation."
  }
  ,{
    id: 199,
    testId: 2,
    word: "extensive",
    pos: "adjective",
    pronunciation: "/ɪkˈsten.sɪv/",
    meaning: "rộng lớn, diện rộng",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "...và phải undergo extensive renovation."
  }
  ,{
    id: 200,
    testId: 2,
    word: "renovation",
    pos: "noun",
    pronunciation: "/ˌren.əˈveɪ.ʃən/",
    meaning: "sự cải tạo, tu sửa",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "...và phải undergo extensive renovation."
  }
  ,{
    id: 201,
    testId: 2,
    word: "initial",
    pos: "adjective",
    pronunciation: "/ɪˈnɪʃ.əl/",
    meaning: "ban đầu",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "Thiệt hại initial assessment cho thấy cần..."
  }
  ,{
    id: 202,
    testId: 2,
    word: "assessment",
    pos: "noun",
    pronunciation: "/əˈses.mənt/",
    meaning: "sự đánh giá",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "Thiệt hại initial assessment cho thấy cần..."
  }
  ,{
    id: 203,
    testId: 2,
    word: "sufficient",
    pos: "adjective",
    pronunciation: "/səˈfɪʃ.ənt/",
    meaning: "đủ, đầy đủ",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "...cần sufficient chi phí bổ sung để hoàn thành công trình..."
  }
  ,{
    id: 204,
    testId: 2,
    word: "authorize",
    pos: "verb",
    pronunciation: "/ˈɔː.θər.aɪz/",
    meaning: "ủy quyền, cho phép",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "...buộc Hội đồng thành phố phải authorize emergency funding."
  }
  ,{
    id: 205,
    testId: 2,
    word: "emergency funding",
    pos: "noun phrase",
    pronunciation: "/ɪˈmɜː.dʒən.si ˈfʌn.dɪŋ/",
    meaning: "ngân quỹ khẩn cấp",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "...buộc Hội đồng thành phố phải authorize emergency funding."
  }
  ,{
    id: 206,
    testId: 2,
    word: "labor disputes",
    pos: "noun phrase",
    pronunciation: "/ˈleɪ.bər dɪˌspjuːts/",
    meaning: "tranh chấp lao động",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "Thật không may, do sự chậm trễ... và các vấn đề về labor disputes..."
  }
  ,{
    id: 207,
    testId: 2,
    word: "frustration",
    pos: "noun",
    pronunciation: "/frʌsˈtreɪ.ʃən/",
    meaning: "sự thất vọng, sự bực bội",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "...dự án đã bị hoãn lại nhiều lần, gây ra sự frustration trong cộng đồng."
  }
  ,{
    id: 208,
    testId: 2,
    word: "arduous",
    pos: "adjective",
    pronunciation: "/ˈɑː.dʒu.əs/",
    meaning: "gian khổ, khó nhọc",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "Sau nhiều tháng arduous effort, cuối cùng nó cũng được repaired xong..."
  }
  ,{
    id: 209,
    testId: 2,
    word: "repaired",
    pos: "verb",
    pronunciation: "/rɪˈpeərd/",
    meaning: "được sửa chữa",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "Sau nhiều tháng arduous effort, cuối cùng nó cũng được repaired xong..."
  }
  ,{
    id: 210,
    testId: 2,
    word: "regain",
    pos: "verb",
    pronunciation: "/rɪˈɡeɪn/",
    meaning: "lấy lại, khôi phục",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "...và dự kiến sẽ regain popularity ngay lập tức..."
  }
  ,{
    id: 211,
    testId: 2,
    word: "popularity",
    pos: "noun",
    pronunciation: "/ˌpɒp.jəˈlær.ə.ti/",
    meaning: "sự phổ biến",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "...và dự kiến sẽ regain popularity ngay lập tức..."
  }
  ,{
    id: 212,
    testId: 2,
    word: "focal point",
    pos: "noun phrase",
    pronunciation: "/ˈfoʊ.kəl pɔɪnt/",
    meaning: "trọng điểm, tâm điểm",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "...trở thành một focal point mới của thành phố."
  }
  ,{
    id: 213,
    testId: 2,
    word: "suspended",
    pos: "verb",
    pronunciation: "/səˈspendɪd/",
    meaning: "tạm đình chỉ, tạm ngừng",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "In parallel, dịch vụ nước ở khu phố Westford đã bị suspended temporarily..."
  }
  ,{
    id: 214,
    testId: 2,
    word: "temporarily",
    pos: "adv",
    pronunciation: "/ˌtem.pəˈrer.ə.li/",
    meaning: "tạm thời",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "In parallel, dịch vụ nước ở khu phố Westford đã bị suspended temporarily..."
  }
  ,{
    id: 215,
    testId: 2,
    word: "expedited",
    pos: "verb",
    pronunciation: "/ˈek.spə.daɪtɪd/",
    meaning: "được xúc tiến nhanh",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "Công việc này, nếu được expedited và hoàn thành sớm..."
  }
  ,{
    id: 216,
    testId: 2,
    word: "resume",
    pos: "verb",
    pronunciation: "/rɪˈzjuːm/",
    meaning: "tiếp tục, hoạt động trở lại",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "...sẽ cho phép dịch vụ resume sớm hơn anticipated."
  }
  ,{
    id: 217,
    testId: 2,
    word: "anticipated",
    pos: "adjective",
    pronunciation: "/ænˈtɪs.ɪ.peɪ.tɪd/",
    meaning: "được dự đoán, mong đợi",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "...sẽ cho phép dịch vụ resume sớm hơn anticipated."
  }
  ,{
    id: 218,
    testId: 2,
    word: "crucial",
    pos: "adjective",
    pronunciation: "/ˈkruː.ʃəl/",
    meaning: "quan trọng, then chốt",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "Điều này là crucial để đảm bảo mọi việc sẽ trở lại regularity như trước..."
  }
  ,{
    id: 219,
    testId: 2,
    word: "regularity",
    pos: "noun",
    pronunciation: "/ˌreɡ.jəˈlær.ə.ti/",
    meaning: "sự đều đặn, trạng thái bình thường",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "Điều này là crucial để đảm bảo mọi việc sẽ trở lại regularity như trước..."
  }
  ,{
    id: 220,
    testId: 2,
    word: "inconvenience",
    pos: "noun",
    pronunciation: "/ˌɪn.kənˈviː.ni.əns/",
    meaning: "sự bất tiện",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "...giảm thiểu inconvenience cho cư dân."
  }
  ,{
    id: 221,
    testId: 2,
    word: "informed",
    pos: "adjective",
    pronunciation: "/ɪnˈfɔːrmd/",
    meaning: "được thông báo, có thông tin",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "Ban quản lý đã ban hành public notices để giữ cho người dân được informed..."
  }
  ,{
    id: 222,
    testId: 2,
    word: "public notices",
    pos: "noun phrase",
    pronunciation: "/ˈpʌb.lɪk ˈnoʊ.tɪ.sɪz/",
    meaning: "thông báo công khai",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "Ban quản lý đã ban hành public notices để giữ cho người dân được informed..."
  }
  ,{
    id: 223,
    testId: 2,
    word: "estimated",
    pos: "adjective",
    pronunciation: "/ˈes.tə.meɪ.tɪd/",
    meaning: "được ước tính",
    storyId: 3,
    storyTitle: "Hồi phục và cải tạo cơ sở",
    englishContext: "...về thời gian hoàn thành estimated của dự án."
  }
  ,{
    id: 224,
    testId: 4,
    word: "spokesperson",
    pos: "noun",
    pronunciation: "/ˈspoʊks.pɜː.sən/",
    meaning: "người phát ngôn",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "Ông Peter, spokesperson chính thức của công ty, sẽ sớm announce..."
  }
  ,{
    id: 225,
    testId: 4,
    word: "announce",
    pos: "verb",
    pronunciation: "/əˈnaʊns/",
    meaning: "thông báo",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "...sẽ sớm announce về kế hoạch mở rộng cơ sở sản xuất..."
  }
  ,{
    id: 226,
    testId: 4,
    word: "press conference",
    pos: "noun",
    pronunciation: "/ˈpres ˌkɑːn.fə.əns/",
    meaning: "họp báo",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "...mở rộng cơ sở sản xuất chính trong một press conference vào tuần tới."
  }
  ,{
    id: 227,
    testId: 4,
    word: "reportedly",
    pos: "adverb",
    pronunciation: "/rɪˈpɔːr.tɪd.li/",
    meaning: "theo báo cáo",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "Tin tức này reportedly đã tạo ra một hiệu ứng domino..."
  }
  ,{
    id: 228,
    testId: 4,
    word: "traffic volume",
    pos: "noun",
    pronunciation: "/ˈtræf.ɪk ˌvɑːl.ju.m/",
    meaning: "lưu lượng giao thông",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "...giúp traffic volume ở khu vực đó được cải thiện steadily..."
  }
  ,{
    id: 229,
    testId: 4,
    word: "steadily",
    pos: "adverb",
    pronunciation: "/ˈsted.əl.i/",
    meaning: "đều đặn, ổn định",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "...giúp traffic volume ở khu vực đó được cải thiện steadily..."
  }
  ,{
    id: 230,
    testId: 4,
    word: "re-routing",
    pos: "verb (gerund)",
    pronunciation: "/ˌriːˈruː.tɪŋ/",
    meaning: "chuyển hướng",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "...nhờ vào việc re-routing các xe tải chở vật liệu."
  }
  ,{
    id: 231,
    testId: 4,
    word: "imperative",
    pos: "adjective",
    pronunciation: "/ɪmˈper.ə.tɪv/",
    meaning: "cấp thiết",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "Sự mở rộng này được xem là một bước đi imperative..."
  }
  ,{
    id: 232,
    testId: 4,
    word: "escalating demand",
    pos: "noun phrase",
    pronunciation: "/ˈes.kə.leɪ.tɪŋ dɪˈmænd/",
    meaning: "nhu cầu tăng cao",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "...để đáp ứng escalating demand của thị trường."
  }
  ,{
    id: 233,
    testId: 4,
    word: "on account of",
    pos: "prepositional phrase",
    pronunciation: "/ɑːn əˈkaʊnt ʌv/",
    meaning: "bởi vì",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "Tuy nhiên, on account of lịch trình công việc bận rộn..."
  }
  ,{
    id: 234,
    testId: 4,
    word: "politely decline",
    pos: "verb phrase",
    pronunciation: "/pəˈlaɪt.li dɪˈklaɪn/",
    meaning: "từ chối một cách lịch sự",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "...ông Peter đã phải politely decline nhiều lời mời tham dự..."
  }
  ,{
    id: 235,
    testId: 4,
    word: "dedication",
    pos: "noun",
    pronunciation: "/ˌded.ɪˈkeɪ.ʃən/",
    meaning: "sự tận tâm",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "...một hành động cho thấy sự dedication của ông."
  }
  ,{
    id: 236,
    testId: 4,
    word: "renovated",
    pos: "verb (past tense)",
    pronunciation: "/ˈren.ə.veɪ.tɪd/",
    meaning: "được tu sửa",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "...hài lòng về chất lượng công trình sau khi căn bếp được renovated."
  }
  ,{
    id: 237,
    testId: 4,
    word: "extensive",
    pos: "adjective",
    pronunciation: "/ɪkˈsten.sɪv/",
    meaning: "kỹ lưỡng, diện rộng",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "Công trình được thực hiện với sự extensive, practically không có flaws..."
  }
  ,{
    id: 238,
    testId: 4,
    word: "practically",
    pos: "adverb",
    pronunciation: "/ˈpræk.tɪ.kəl.i/",
    meaning: "hầu như",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "Công trình được thực hiện with sự extensive, practically không có flaws..."
  }
  ,{
    id: 239,
    testId: 4,
    word: "flaws",
    pos: "noun",
    pronunciation: "/flɔːz/",
    meaning: "lỗi, khuyết điểm",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "Công trình được thực hiện with sự extensive, practically không có flaws..."
  }
  ,{
    id: 240,
    testId: 4,
    word: "attesting to",
    pos: "verb phrase",
    pronunciation: "/əˈtestɪŋ tuː/",
    meaning: "chứng minh cho",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "...không có flaws nào đáng kể, attesting to sự skillful của đội ngũ."
  }
  ,{
    id: 241,
    testId: 4,
    word: "skillful",
    pos: "adjective",
    pronunciation: "/ˈskɪl.fəl/",
    meaning: "lành nghề",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "...không có flaws nào đáng kể, attesting to sự skillful của đội ngũ."
  }
  ,{
    id: 242,
    testId: 4,
    word: "scrub",
    pos: "verb",
    pronunciation: "/skrʌb/",
    meaning: "chà, cọ",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "Đầu tiên, bạn cần scrub bề mặt kỹ lưỡng..."
  }
  ,{
    id: 243,
    testId: 4,
    word: "sandpaper",
    pos: "noun",
    pronunciation: "/ˈsændˌpeɪ.pər/",
    meaning: "giấy nhám",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "...và dùng sandpaper làm mịn để đảm bảo..."
  }
  ,{
    id: 244,
    testId: 4,
    word: "adhesion",
    pos: "noun",
    pronunciation: "/ədˈhiː.ʒən/",
    meaning: "độ bám dính",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "...để đảm bảo độ adhesion trước khi sơn."
  }
  ,{
    id: 245,
    testId: 4,
    word: "aesthetic",
    pos: "adjective",
    pronunciation: "/esˈθet.ɪk/",
    meaning: "thẩm mỹ",
    storyId: 1,
    storyTitle: "Công bố và cải tạo",
    englishContext: "Việc chuẩn bị bề mặt kỹ lưỡng này là chìa khóa để đạt được kết quả aesthetic."
  }
  ,{
    id: 246,
    testId: 4,
    word: "overloaded",
    pos: "adjective",
    pronunciation: "/ˌoʊ.vəˈloʊ.dɪd/",
    meaning: "quá tải",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "Dù có nhiều hoãn lại do lịch trình overloaded..."
  }
  ,{
    id: 247,
    testId: 4,
    word: "telecommuting policy",
    pos: "noun phrase",
    pronunciation: "/ˌtel.ɪ.kəˈmjuː.t̬ɪŋ ˈpɑː.lə.si/",
    meaning: "chính sách làm việc từ xa",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "...cuộc họp về telecommuting policy cuối cùng đã được convened."
  }
  ,{
    id: 248,
    testId: 4,
    word: "convened",
    pos: "verb",
    pronunciation: "/kənˈviːnd/",
    meaning: "triệu tập, tổ chức (cuộc họp)",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "...cuộc họp về telecommuting policy cuối cùng đã được convened."
  }
  ,{
    id: 249,
    testId: 4,
    word: "corroborated",
    pos: "verb",
    pronunciation: "/kəˈrɑː.bə.reɪ.tɪd/",
    meaning: "xác nhận, chứng thực",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "Dữ liệu khảo sát được corroborated bởi các báo cáo..."
  }
  ,{
    id: 250,
    testId: 4,
    word: "conclusive",
    pos: "adjective",
    pronunciation: "/kənˈkluː.sɪv/",
    meaning: "thuyết phục, kết luận",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "...bởi các báo cáo nội bộ một cách conclusive..."
  }
  ,{
    id: 251,
    testId: 4,
    word: "morale",
    pos: "noun",
    pronunciation: "/məˈræl/",
    meaning: "tinh thần, sự hài lòng",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "...cho thấy sự hài lòng và morale của nhân viên đã tăng..."
  }
  ,{
    id: 252,
    testId: 4,
    word: "incentive",
    pos: "noun",
    pronunciation: "/ɪnˈsen.tɪv/",
    meaning: "động lực, khích lệ",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "Sự thay đổi này được xem là một incentive hiệu quả để giữ lại nhân tài."
  }
  ,{
    id: 253,
    testId: 4,
    word: "ameliorated",
    pos: "verb",
    pronunciation: "/əˈmiː.li.ə.reɪ.tɪd/",
    meaning: "cải thiện",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "Mặc dù môi trường làm việc đã ameliorated..."
  }
  ,{
    id: 254,
    testId: 4,
    word: "resigning",
    pos: "verb",
    pronunciation: "/rɪˈzaɪnɪŋ/",
    meaning: "từ chức",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "...một số nhân viên đã resigning chỉ vì lý do personal circumstances..."
  }
  ,{
    id: 255,
    testId: 4,
    word: "personal circumstances",
    pos: "noun phrase",
    pronunciation: "/ˈpɜː.sən.əl ˈsɜː.kəm.stænsɪz/",
    meaning: "hoàn cảnh cá nhân",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "...một số nhân viên đã resigning chỉ vì lý do personal circumstances..."
  }
  ,{
    id: 256,
    testId: 4,
    word: "enrollment",
    pos: "noun",
    pronunciation: "/ɪnˈroʊl.mənt/",
    meaning: "việc đăng ký",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "Điều này buộc bộ phận Nhân sự cần nhanh chóng xử lý đơn enrollment và onboarding..."
  }
  ,{
    id: 257,
    testId: 4,
    word: "onboarding",
    pos: "noun",
    pronunciation: "/ˈɑːn.bɔːr.dɪŋ/",
    meaning: "quy trình tiếp nhận nhân viên mới",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "Điều này buộc bộ phận Nhân sự cần nhanh chóng xử lý đơn enrollment và onboarding..."
  }
  ,{
    id: 258,
    testId: 4,
    word: "prospective candidates",
    pos: "noun phrase",
    pronunciation: "/prəˈspek.tɪv ˈkæn.dɪ.deɪts/",
    meaning: "ứng viên tiềm năng",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "...của các prospective candidates để duy trì operational capacity."
  }
  ,{
    id: 259,
    testId: 4,
    word: "operational capacity",
    pos: "noun phrase",
    pronunciation: "/ˌɑː.pəˈreɪ.ʃən.əl kəˈpæs.ə.ti/",
    meaning: "năng lực vận hành",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "...của các prospective candidates để duy trì operational capacity."
  }
  ,{
    id: 260,
    testId: 4,
    word: "speculation",
    pos: "noun",
    pronunciation: "/ˌspec.jəˈleɪ.ʃən/",
    meaning: "sự suy đoán, tin đồn",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "Trong khi đó, ban lãnh đạo phải đối phó với speculation của thị trường."
  }
  ,{
    id: 261,
    testId: 4,
    word: "liquidation",
    pos: "noun",
    pronunciation: "/ˌlɪk.wəˈdeɪ.ʃən/",
    meaning: "thanh lý, giải thể",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "Tin đồn về việc công ty sắp liquidation là unfounded."
  }
  ,{
    id: 262,
    testId: 4,
    word: "unfounded",
    pos: "adjective",
    pronunciation: "/ʌnˈfaʊn.dɪd/",
    meaning: "không có căn cứ",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "Tin đồn về việc công ty sắp liquidation là unfounded."
  }
  ,{
    id: 263,
    testId: 4,
    word: "meet its deadline",
    pos: "verb phrase",
    pronunciation: "/miːt ɪts ˈded.laɪn/",
    meaning: "hoàn thành đúng hạn",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "Tuy nhiên, nếu công ty không meet its deadline đã cam kết..."
  }
  ,{
    id: 264,
    testId: 4,
    word: "immediate crisis",
    pos: "noun phrase",
    pronunciation: "/ɪˈmiː.di.ət ˈkraɪ.sɪs/",
    meaning: "khủng hoảng cấp bách",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "...đó sẽ là một vấn đề immediate crisis gây ảnh hưởng..."
  }
  ,{
    id: 265,
    testId: 4,
    word: "solvency",
    pos: "noun",
    pronunciation: "/ˈsɑːl.vən.si/",
    meaning: "khả năng thanh toán",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "...gây ảnh hưởng đến solvency và financial security."
  }
  ,{
    id: 266,
    testId: 4,
    word: "financial security",
    pos: "noun phrase",
    pronunciation: "/fəˈnæn.ʃəl sɪˈkjʊr.ə.ti/",
    meaning: "sự an toàn tài chính",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "...gây ảnh hưởng đến solvency và financial security."
  }
  ,{
    id: 267,
    testId: 4,
    word: "preserve",
    pos: "verb",
    pronunciation: "/prɪˈzɜːv/",
    meaning: "bảo tồn, duy trì",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "Việc tuân thủ hợp đồng là cực kỳ quan trọng để preserve credibility..."
  }
  ,{
    id: 268,
    testId: 4,
    word: "credibility",
    pos: "noun",
    pronunciation: "/ˌkred.əˈbɪl.ə.ti/",
    meaning: "uy tín, độ tin cậy",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "Việc tuân thủ hợp đồng là cực kỳ quan trọng để preserve credibility..."
  }
  ,{
    id: 269,
    testId: 4,
    word: "penalties",
    pos: "noun",
    pronunciation: "/ˈpen.əl.tiz/",
    meaning: "hình phạt, tiền phạt",
    storyId: 2,
    storyTitle: "Xử lý vấn đề nhân sự và tài chính",
    englishContext: "...để preserve credibility và tránh các penalties nặng nề."
  }
  ,{
    id: 270,
    testId: 4,
    word: "authorize",
    pos: "verb",
    pronunciation: "/ˈɔː.θə.raɪz/",
    meaning: "cho phép, ủy quyền",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "Tuần trước, công ty đã authorize mình đi gặp..."
  }
  ,{
    id: 271,
    testId: 4,
    word: "distributor",
    pos: "noun",
    pronunciation: "/dɪˈstrɪb.jə.tər/",
    meaning: "nhà phân phối",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "Tuần trước, công ty đã authorize mình đi gặp một distributor lớn ở Đà Nẵng..."
  }
  ,{
    id: 272,
    testId: 4,
    word: "exclusive agreement",
    pos: "noun phrase",
    pronunciation: "/ɪkˈskluː.sɪv əˈɡriː.mənt/",
    meaning: "hợp đồng độc quyền",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "Mục tiêu chính là ký lại exclusive agreement..."
  }
  ,{
    id: 273,
    testId: 4,
    word: "rectified",
    pos: "verb",
    pronunciation: "/ˈrek.tɪ.faɪd/",
    meaning: "sửa chữa, điều chỉnh",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "...vì có vài thay đổi về quy trình shipping cần được rectified."
  }
  ,{
    id: 274,
    testId: 4,
    word: "undergo",
    pos: "verb",
    pronunciation: "/ˌʌn.dəˈɡoʊ/",
    meaning: "trải qua, chịu (một quá trình)",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "...do nhà máy đang undergo maintenance."
  }
  ,{
    id: 275,
    testId: 4,
    word: "maintenance",
    pos: "noun",
    pronunciation: "/ˈmeɪn.tən.əns/",
    meaning: "bảo trì, bảo dưỡng",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "...do nhà máy đang undergo maintenance."
  }
  ,{
    id: 276,
    testId: 4,
    word: "potential delays",
    pos: "noun phrase",
    pronunciation: "/pəˈten.ʃəl dɪˈleɪz/",
    meaning: "khả năng chậm trễ",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "Mình hơi lo về potential delays, nhưng phía nhà phân phối..."
  }
  ,{
    id: 277,
    testId: 4,
    word: "gratitude",
    pos: "noun",
    pronunciation: "/ˈɡræt.ɪ.tuːd/",
    meaning: "lòng biết ơn",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "...nhưng phía nhà phân phối lại thể hiện gratitude sâu sắc..."
  }
  ,{
    id: 278,
    testId: 4,
    word: "challenging",
    pos: "adjective",
    pronunciation: "/ˈtʃæl.ɪn.dʒɪŋ/",
    meaning: "thử thách, khó khăn",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "...sẵn sàng hợp tác và hỗ trợ họ trong thời điểm challenging này."
  }
  ,{
    id: 279,
    testId: 4,
    word: "complimentary",
    pos: "adjective",
    pronunciation: "/ˌkɑːm.plɪˈmen.t̬ɚ.i/",
    meaning: "miễn phí, kèm theo",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "Điều làm mình bất ngờ nhất là họ đã sắp xếp complimentary accommodations cho mình..."
  }
  ,{
    id: 280,
    testId: 4,
    word: "accommodations",
    pos: "noun",
    pronunciation: "/əˌkɑː.məˈdeɪ.ʃənz/",
    meaning: "chỗ ở",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "Điều làm mình bất ngờ nhất là họ đã sắp xếp complimentary accommodations cho mình..."
  }
  ,{
    id: 281,
    testId: 4,
    word: "exceptional",
    pos: "adjective",
    pronunciation: "/ɪkˈsep.ʃə.nəl/",
    meaning: "xuất sắc, đặc biệt",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "Họ nói đó là một phần dịch vụ exceptional dành cho..."
  }
  ,{
    id: 282,
    testId: 4,
    word: "esteemed",
    pos: "adjective",
    pronunciation: "/ɪˈstiːmd/",
    meaning: "được kính trọng",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "...dành cho các đối tác esteemed của họ."
  }
  ,{
    id: 283,
    testId: 4,
    word: "regulations",
    pos: "noun",
    pronunciation: "/ˌreɡ.jəˈleɪ.ʃənz/",
    meaning: "quy định",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "Chiều cùng ngày, mình được thông báo rằng một số regulations mới..."
  }
  ,{
    id: 284,
    testId: 4,
    word: "pass (a law/regulation)",
    pos: "verb phrase",
    pronunciation: "/pæs/",
    meaning: "thông qua (đạo luật, quy định)",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "...một số regulations mới về an toàn kho vận đã vừa được pass..."
  }
  ,{
    id: 285,
    testId: 4,
    word: "vacated",
    pos: "verb",
    pronunciation: "/ˈveɪ.keɪ.tɪd/",
    meaning: "bỏ trống, rời đi",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "...và vì vậy khu kho cũ đã được vacated để chuyển..."
  }
  ,{
    id: 286,
    testId: 4,
    word: "transition",
    pos: "noun",
    pronunciation: "/trænˈzɪʃ.ən/",
    meaning: "sự chuyển đổi",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "Sự transition này được thực hiện seamlessly."
  }
  ,{
    id: 287,
    testId: 4,
    word: "seamlessly",
    pos: "adverb",
    pronunciation: "/ˈsiː.m.ləs.li/",
    meaning: "trơn tru, liền mạch",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "Sự transition này được thực hiện seamlessly."
  }
  ,{
    id: 288,
    testId: 4,
    word: "volume discounts",
    pos: "noun phrase",
    pronunciation: "/ˈvɑːl.juːm ˈdɪs.kaʊnts/",
    meaning: "giảm giá theo số lượng",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "Sau buổi họp, họ còn đề xuất một số volume discounts đặc biệt..."
  }
  ,{
    id: 289,
    testId: 4,
    word: "optimistic",
    pos: "adjective",
    pronunciation: "/ˌaː.p.təˈmɪs.tɪk/",
    meaning: "lạc quan",
    storyId: 3,
    storyTitle: "Mối hợp tác vượt mong đợi",
    englishContext: "...và optimistic về tương lai hợp tác."
  }
  ,{
    id: 290,
    testId: 5,
    word: "commence",
    pos: "verb phrase",
    pronunciation: "/kə'mens/",
    meaning: "bắt đầu",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "Sáng nay khi vừa commence operations..."
  }
  ,{
    id: 291,
    testId: 5,
    word: "operation",
    pos: "noun",
    pronunciation: "/ˌɑː.pəˈreɪ.ʃənz/",
    meaning: "sự hoạt động, vận hành",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "Sáng nay khi vừa commence operations..."
  }
  ,{
    id: 292,
    testId: 5,
    word: "system malfunction",
    pos: "noun phrase",
    pronunciation: "/ˈsɪs.təm mælˈfʌŋk.ʃən/",
    meaning: "sự cố hệ thống",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "...một system malfunction bất ngờ appeared..."
  }
  ,{
    id: 293,
    testId: 5,
    word: "appeared",
    pos: "verb",
    pronunciation: "/əˈpɪrd/",
    meaning: "xuất hiện",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "...một system malfunction bất ngờ appeared..."
  }
  ,{
    id: 294,
    testId: 5,
    word: "disrupted",
    pos: "verb",
    pronunciation: "/dis'rʌptid/",
    meaning: "gián đoạn",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "...khiến toàn bộ dữ liệu bị disrupted nghiêm trọng."
  }
  ,{
    id: 295,
    testId: 5,
    word: "indicated",
    pos: "verb",
    pronunciation: "/ˈɪn.dɪ.keɪ.tɪd/",
    meaning: "chỉ ra, thông báo",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "Ban đầu, bộ phận IT indicated rằng impact chỉ mang tính..."
  }
  ,{
    id: 296,
    testId: 5,
    word: "impact",
    pos: "noun",
    pronunciation: "/ˈɪm.pækt/",
    meaning: "tác động, ảnh hưởng",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "Ban đầu, bộ phận IT indicated rằng impact chỉ mang tính..."
  }
  ,{
    id: 297,
    testId: 5,
    word: "partial",
    pos: "adjective",
    pronunciation: "/ˈpɑːr.ʃəl/",
    meaning: "một phần",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "...rằng impact chỉ mang tính chất partial..."
  }
  ,{
    id: 298,
    testId: 5,
    word: "severe",
    pos: "adjective",
    pronunciation: "/si'vir/",
    meaning: "nghiêm trọng",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "...nhưng thực tế mức độ lại khá severe..."
  }
  ,{
    id: 299,
    testId: 5,
    word: "critical",
    pos: "adjective",
    pronunciation: "/ˈkrɪt.ɪ.kəl/",
    meaning: "quan trọng, cấp bách",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "Nhiều file critical bị inadvertently locked..."
  }
  ,{
    id: 300,
    testId: 5,
    word: "inadvertently",
    pos: "adverb",
    pronunciation: "/ˌɪn.ədˈvɜː.tənt.li/",
    meaning: "vô tình, không cố ý",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "Nhiều file critical bị inadvertently locked..."
  }
  ,{
    id: 301,
    testId: 5,
    word: "locked",
    pos: "verb",
    pronunciation: "/lɑːkt/",
    meaning: "bị khóa",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "Nhiều file critical bị inadvertently locked..."
  }
  ,{
    id: 302,
    testId: 5,
    word: "retrieved",
    pos: "verb",
    pronunciation: "/ri'trivd/",
    meaning: "lấy lại, truy xuất",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "...và không thể retrieved, dù một số tài liệu..."
  }
  ,{
    id: 303,
    testId: 5,
    word: "removable",
    pos: "adjective",
    pronunciation: "/ri'mu:.və.bəl/",
    meaning: "có thể tháo rời",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "...dù một số tài liệu vốn dĩ là dạng removable."
  }
  ,{
    id: 304,
    testId: 5,
    word: "paralyzed",
    pos: "verb",
    pronunciation: "/ˈper.ə.laɪzd/",
    meaning: "làm tê liệt, đình trệ",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "Sự cố này đã paralyzed productivity của toàn bộ workforce."
  }
  ,{
    id: 305,
    testId: 5,
    word: "productivity",
    pos: "noun",
    pronunciation: "/ˌproʊ.dəkˈtɪv.ə.t̬i/",
    meaning: "năng suất",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "Sự cố này đã paralyzed productivity của toàn bộ workforce."
  }
  ,{
    id: 306,
    testId: 5,
    word: "workforce",
    pos: "noun",
    pronunciation: "/ˈwɜːk.fɔːrs/",
    meaning: "lực lượng lao động",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "Sự cố này đã paralyzed productivity của toàn bộ workforce."
  }
  ,{
    id: 307,
    testId: 5,
    word: "intensive troubleshooting",
    pos: "noun phrase",
    pronunciation: "/in'ten.siv 'trʌb.lʃu:.tiŋ/",
    meaning: "xử lý sự cố chuyên sâu",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "Sau gần một giờ undergo quá trình intensive troubleshooting..."
  }
  ,{
    id: 308,
    testId: 5,
    word: "decisively",
    pos: "adverb",
    pronunciation: "/dɪˈsaɪ.sɪv.li/",
    meaning: "một cách quyết đoán",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "...nhóm kỹ thuật đã decisively áp dụng một thủ tục khẩn cấp..."
  }
  ,{
    id: 309,
    testId: 5,
    word: "reinitialize",
    pos: "verb",
    pronunciation: "/ri:.i'niʃ.ə.laiz/",
    meaning: "khởi tạo lại",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "...khẩn cấp mới để reinitialize hệ thống và xây dựng..."
  }
  ,{
    id: 310,
    testId: 5,
    word: "satisfying",
    pos: "adjective",
    pronunciation: "/ˈsæt.ɪs.faɪ.ɪŋ/",
    meaning: "thỏa mãn, hài lòng",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "Cuối cùng, kết quả phục hồi khá satisfying."
  }
  ,{
    id: 311,
    testId: 5,
    word: "guarantee",
    pos: "noun",
    pronunciation: "/ˌɡær.ənˈtiː/",
    meaning: "đảm bảo",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "Công ty đã đưa ra một lời guarantee rằng sự cố..."
  }
  ,{
    id: 312,
    testId: 5,
    word: "definitely not recur",
    pos: "verb phrase",
    pronunciation: "/ˈdef.ɪ.nət.li nɑːt rɪˈkɜː/",
    meaning: "chắc chắn không xảy ra lại",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "...rằng sự cố sẽ definitely not recur..."
  }
  ,{
    id: 313,
    testId: 5,
    word: "primarily",
    pos: "adverb",
    pronunciation: "/ˈpraɪ.mer.ə.li/",
    meaning: "chủ yếu",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "...và nguyên nhân primarily là do một bản..."
  }
  ,{
    id: 314,
    testId: 5,
    word: "software update",
    pos: "noun phrase",
    pronunciation: "/ˈsɔːft.wer ˈʌp.deɪt/",
    meaning: "cập nhật phần mềm",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "...là do một bản software update được triển khai..."
  }
  ,{
    id: 315,
    testId: 5,
    word: "mandated",
    pos: "verb",
    pronunciation: "/ˈmæn.deɪ.tɪd/",
    meaning: "bắt buộc, yêu cầu thực hiện",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "...ban quản lý đã mandated một xem xét kỹ lưỡng..."
  }
  ,{
    id: 316,
    testId: 5,
    word: "protocols",
    pos: "noun",
    pronunciation: "/ˈproʊ.tə.kɑːlz/",
    meaning: "quy trình, giao thức",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "...một xem xét kỹ lượng về protocols IT..."
  }
  ,{
    id: 317,
    testId: 5,
    word: "deployment",
    pos: "noun",
    pronunciation: "/di'plɔi.mənt/",
    meaning: "việc triển khai",
    storyId: 1,
    storyTitle: "Ngày công ty gặp biến",
    englishContext: "...và quy trình deployment triển khai."
  }
  ,{
    id: 318,
    testId: 5,
    word: "refused",
    pos: "verb",
    pronunciation: "/rɪˈfjuːzd/",
    meaning: "từ chối, không thực hiện",
    storyId: 2,
    storyTitle: "Một ngày bình thường với những điều không bình thường",
    englishContext: "Buổi sáng, tôi hầu như không kịp ra khỏi nhà vì chiếc xe máy refused nổ máy..."
  }
  ,{
    id: 319,
    testId: 5,
    word: "operate properly",
    pos: "verb phrase",
    pronunciation: "/ˈɑː.pə.reɪt ˈprɑː.pɚ.li/",
    meaning: "vận hành đúng cách",
    storyId: 2,
    storyTitle: "Một ngày bình thường với những điều không bình thường",
    englishContext: "Hóa ra bộ đề chỉ hoạt động một phần và không thể operate properly."
  }
  ,{
    id: 320,
    testId: 5,
    word: "available",
    pos: "adjective",
    pronunciation: "/əˈveɪ.lə.bəl/",
    meaning: "có sẵn, sẵn sàng",
    storyId: 2,
    storyTitle: "Một ngày bình thường với những điều không bình thường",
    englishContext: "Tôi phải dẫn xe đến tiệm sửa chữa... nơi chỉ còn một thợ đang available..."
  }
  ,{
    id: 321,
    testId: 5,
    word: "on leave",
    pos: "verb phrase",
    pronunciation: "/ɑːn liːv/",
    meaning: "đang nghỉ phép",
    storyId: 2,
    storyTitle: "Một ngày bình thường với những điều không bình thường",
    englishContext: "...vì các đồng nghiệp khác đang on leave."
  }
  ,{
    id: 322,
    testId: 5,
    word: "acknowledged",
    pos: "verb",
    pronunciation: "/əkˈnɑː.lɪdʒd/",
    meaning: "thừa nhận, ghi nhận",
    storyId: 2,
    storyTitle: "Một ngày bình thường với những điều không bình thường",
    englishContext: "May mắn thay, anh ấy acknowledged tình trạng khẩn cấp..."
  }
  ,{
    id: 323,
    testId: 5,
    word: "repairs",
    pos: "noun",
    pronunciation: "/rɪˈperz/",
    meaning: "việc sửa chữa",
    storyId: 2,
    storyTitle: "Một ngày bình thường với những điều không bình thường",
    englishContext: "Những repairs ban đầu tưởng chừng đơn giản..."
  }
  ,{
    id: 324,
    testId: 5,
    word: "straightforward",
    pos: "adjective",
    pronunciation: "/ˌstreɪtˈfɔːr.wərd/",
    meaning: "đơn giản, dễ hiểu",
    storyId: 2,
    storyTitle: "Một ngày bình thường với những điều không bình thường",
    englishContext: "Những repairs ban đầu tưởng chừng đơn giản và straightforward..."
  }
  ,{
    id: 325,
    testId: 5,
    word: "vastly",
    pos: "adverb",
    pronunciation: "/ˈvæst.li/",
    meaning: "rất nhiều, đáng kể",
    storyId: 2,
    storyTitle: "Một ngày bình thường với những điều không bình thường",
    englishContext: "...nhưng vấn đề thật sự vastly hơn..."
  }
  ,{
    id: 326,
    testId: 5,
    word: "malfunctioning",
    pos: "adjective / verb",
    pronunciation: "/ˌmæl.fʌŋk.ʃə.nɪŋ/",
    meaning: "trục trặc, hỏng",
    storyId: 2,
    storyTitle: "Một ngày bình thường với những điều không bình thường",
    englishContext: "...ổ điện bên trong đã bị malfunctioning."
  }
  ,{
    id: 327,
    testId: 5,
    word: "sincere",
    pos: "adjective",
    pronunciation: "/sɪnˈsɪr/",
    meaning: "chân thành",
    storyId: 2,
    storyTitle: "Một ngày bình thường với những điều không bình thường",
    englishContext: "“Anh yên tâm, sửa được,” anh thợ nói với vẻ rất sincere..."
  }
  ,{
    id: 328,
    testId: 5,
    word: "professionalism",
    pos: "noun",
    pronunciation: "/prəˈfeʃ.ən.əl.ɪ.zəm/",
    meaning: "tính chuyên nghiệp",
    storyId: 2,
    storyTitle: "Một ngày bình thường với những điều không bình thường",
    englishContext: "...thể hiện professionalism cao."
  }
  ,{
    id: 329,
    testId: 5,
    word: "obvious",
    pos: "adjective",
    pronunciation: "/ˈɑːb.vi.əs/",
    meaning: "rõ ràng, hiển nhiên",
    storyId: 2,
    storyTitle: "Một ngày bình thường với những điều không bình thường",
    englishContext: "Và đúng là như vậy, dù lỗi vốn không hề obvious và khá không lường trước."
  }
  ,{
    id: 330,
    testId: 5,
    word: "skillfully",
    pos: "adverb",
    pronunciation: "/ˈskɪl.fəl.i/",
    meaning: "một cách thành thạo, khéo léo",
    storyId: 2,
    storyTitle: "Một ngày bình thường với những điều không bình thường",
    englishContext: "Anh ấy đã skillfully diagnose và rectify sự cố..."
  }
  ,{
    id: 331,
    testId: 5,
    word: "diagnose",
    pos: "verb",
    pronunciation: "/ˈdaɪ.əɡ.noʊz/",
    meaning: "chẩn đoán",
    storyId: 2,
    storyTitle: "Một ngày bình thường với những điều không bình thường",
    englishContext: "Anh ấy đã skillfully diagnose và rectify sự cố..."
  }
  ,{
    id: 332,
    testId: 5,
    word: "rectify",
    pos: "verb",
    pronunciation: "/ˈrek.tɪ.faɪ/",
    meaning: "sửa chữa, khắc phục",
    storyId: 2,
    storyTitle: "Một ngày bình thường với những điều không bình thường",
    englishContext: "Anh ấy đã skillfully diagnose và rectify sự cố..."
  }
  ,{
    id: 333,
    testId: 5,
    word: "advertised",
    pos: "verb",
    pronunciation: "/ˈæd.və.taɪzd/",
    meaning: "quảng cáo",
    storyId: 2,
    storyTitle: "Một ngày bình thường với những điều không bình thường",
    englishContext: "Tôi thấy máy pha mới đang được advertised là..."
  }
  ,{
    id: 334,
    testId: 5,
    word: "state-of-the-art",
    pos: "adjective",
    pronunciation: "/ˌsteɪt.əv.ði.ɑːrt/",
    meaning: "hiện đại nhất, tiên tiến",
    storyId: 2,
    storyTitle: "Một ngày bình thường với những điều không bình thường",
    englishContext: "Tôi chỉ thầm mong thiết bị state-of-the-art này..."
  }
  ,{
    id: 335,
    testId: 5,
    word: "allowing",
    pos: "verb",
    pronunciation: "/əˈlaʊ.ɪŋ/",
    meaning: "cho phép, làm cho có thể",
    storyId: 2,
    storyTitle: "Một ngày bình thường với những điều không bình thường",
    englishContext: "...allowing tôi tận hưởng buổi sáng..."
  }
  ,{
    id: 336,
    testId: 5,
    word: "uninterrupted",
    pos: "adjective",
    pronunciation: "/ˌʌn.ɪn.təˈrʌp.tɪd/",
    meaning: "không bị gián đoạn",
    storyId: 2,
    storyTitle: "Một ngày bình thường với những điều không bình thường",
    englishContext: "...một cách suôn sẻ và uninterrupted."
  }
  ,{
    id: 337,
    testId: 5,
    word: "advise",
    pos: "verb",
    pronunciation: "/ədˈvaɪz/",
    meaning: "khuyên, tư vấn",
    storyId: 3,
    storyTitle: "Drama nhà hàng xóm",
    englishContext: "Chiều qua, tôi được hàng xóm advise tham gia..."
  }
  ,{
    id: 338,
    testId: 5,
    word: "reluctant",
    pos: "adjective",
    pronunciation: "/rɪˈlʌk.tənt/",
    meaning: "miễn cưỡng, do dự",
    storyId: 3,
    storyTitle: "Drama nhà hàng xóm",
    englishContext: "Tôi hơi reluctant ban đầu, nhưng vì..."
  }
  ,{
    id: 339,
    testId: 5,
    word: "admission",
    pos: "noun",
    pronunciation: "/ədˈmɪʃ.ən/",
    meaning: "sự vào cửa, vé vào cửa",
    storyId: 3,
    storyTitle: "Drama nhà hàng xóm",
    englishContext: "...nhưng vì admission miễn phí, tôi quyết định..."
  }
  ,{
    id: 340,
    testId: 5,
    word: "solicited",
    pos: "verb",
    pronunciation: "/səˈlɪs.ɪ.tɪd/",
    meaning: "được yêu cầu, được đề nghị",
    storyId: 3,
    storyTitle: "Drama nhà hàng xóm",
    englishContext: "...với hy vọng không bị solicited."
  }
  ,{
    id: 341,
    testId: 5,
    word: "potential",
    pos: "adjective",
    pronunciation: "/pəˈten.ʃəl/",
    meaning: "tiềm năng, khả năng",
    storyId: 3,
    storyTitle: "Drama nhà hàng xóm",
    englishContext: "Buổi giới thiệu trông rất potential, với ánh sáng và..."
  }
  ,{
    id: 342,
    testId: 5,
    word: "breakthrough",
    pos: "noun",
    pronunciation: "/ˈbreɪk.θruː/",
    meaning: "bước đột phá",
    storyId: 3,
    storyTitle: "Drama nhà hàng xóm",
    englishContext: "...MC nói rằng sản phẩm này sắp tạo ra một breakthrough trong ngành..."
  }
  ,{
    id: 343,
    testId: 5,
    word: "pledged",
    pos: "verb",
    pronunciation: "/pledʒd/",
    meaning: "cam kết, hứa hẹn",
    storyId: 3,
    storyTitle: "Drama nhà hàng xóm",
    englishContext: "...và pledged về hiệu suất unprecedented."
  }
  ,{
    id: 344,
    testId: 5,
    word: "unprecedented",
    pos: "adjective",
    pronunciation: "/ʌnˈpres.ɪ.den.tɪd/",
    meaning: "chưa từng có, chưa có tiền lệ",
    storyId: 3,
    storyTitle: "Drama nhà hàng xóm",
    englishContext: "...và pledged về hiệu suất unprecedented."
  }
  ,{
    id: 345,
    testId: 5,
    word: "remarkably",
    pos: "adverb",
    pronunciation: "/rɪˈmɑːr.kə.bli/",
    meaning: "đáng kể, đáng chú ý",
    storyId: 3,
    storyTitle: "Drama nhà hàng xóm",
    englishContext: "MC nói rằng sản phẩm này... kêu to remarkably, tạo ra..."
  }
  ,{
    id: 346,
    testId: 5,
    word: "suspension",
    pos: "noun",
    pronunciation: "/səˈpen.ʃən/",
    meaning: "sự tạm ngưng",
    storyId: 3,
    storyTitle: "Drama nhà hàng xóm",
    englishContext: "...đến mức livestream phải tạm suspension ngay lập tức."
  }
  ,{
    id: 347,
    testId: 5,
    word: "scattered",
    pos: "adjective",
    pronunciation: "/ˈskæt.əd/",
    meaning: "tán loạn, rải rác",
    storyId: 3,
    storyTitle: "Drama nhà hàng xóm",
    englishContext: "Mọi người hoảng hốt chạy scattered ra khỏi khu vực..."
  }
  ,{
    id: 348,
    testId: 5,
    word: "designated",
    pos: "adjective",
    pronunciation: "/ˈdez.ɪɡ.neɪ.tɪd/",
    meaning: "được chỉ định, được phân công",
    storyId: 3,
    storyTitle: "Drama nhà hàng xóm",
    englishContext: "...ra khỏi khu vực designated, tạo ra..."
  }
  ,{
    id: 349,
    testId: 5,
    word: "expenditures",
    pos: "noun",
    pronunciation: "/ɪkˈspen.dɪ.tʃərz/",
    meaning: "chi phí, khoản chi",
    storyId: 3,
    storyTitle: "Drama nhà hàng xóm",
    englishContext: "...chi phí sửa chữa dàn âm thanh bị hỏng hóc đã trở thành expenditures..."
  }
  ,{
    id: 350,
    testId: 5,
    word: "launch",
    pos: "verb",
    pronunciation: "/lɔːntʃ/",
    meaning: "ra mắt, tung ra thị trường",
    storyId: 3,
    storyTitle: "Drama nhà hàng xóm",
    englishContext: "Do đó, sản phẩm chưa kịp launch đã..."
  }
  ,{
    id: 351,
    testId: 5,
    word: "entitled",
    pos: "adjective",
    pronunciation: "/ɪnˈtaɪ.təld/",
    meaning: "được quyền hưởng",
    storyId: 3,
    storyTitle: "Drama nhà hàng xóm",
    englishContext: "...đảm bảo rằng tất cả người tham dự đều được entitled nhận phần quà..."
  }
  ,{
    id: 352,
    testId: 5,
    word: "Organizing Committee",
    pos: "noun phrase",
    pronunciation: "/ˈɔːr.ɡə.naɪ.zɪŋ kəˈmɪt.i/",
    meaning: "Ban Tổ chức",
    storyId: 3,
    storyTitle: "Drama nhà hàng xóm",
    englishContext: "...để giảm thiểu thiệt hại về danh tiếng và lấy lại thiện chí, Organizing Committee đã đảm bảo..."
  }
  ,{
    id: 353,
    testId: 5,
    word: "skeptical",
    pos: "adjective",
    pronunciation: "/ˈskep.tɪ.kəl/",
    meaning: "hoài nghi, nghi ngờ",
    storyId: 3,
    storyTitle: "Drama nhà hàng xóm",
    englishContext: "Tôi rời đi với niềm tin rằng đôi khi, việc skeptical..."
  }
  ,{
    id: 354,
    testId: 5,
    word: "over-advertised",
    pos: "adjective",
    pronunciation: "/ˌoʊ.vəˈæd.və.taɪzd/",
    meaning: "quảng cáo quá mức",
    storyId: 3,
    storyTitle: "Drama nhà hàng xóm",
    englishContext: "...về các sản phẩm được over-advertised là điều nên làm."
  }
];
