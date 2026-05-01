const runSuccess = [
  {
    type: "run_started",
    timestamp: 1000,
    run_id: "run_001",
    query: "Compare Apple's financial performance against Microsoft and Google for FY2023.",
    startTime: Date.now(),
  },
  {
    type: "agent_thought",
    timestamp: 1500,
    content: "Breaking query into parallel data-fetch tasks: Apple, Microsoft, Google. Will synthesise after.",
  },
  {
    type: "task_spawned",
    timestamp: 2000,
    task_id: "t_001",
    label: "Fetch Apple FY2023 Financials",
    agent: "data-agent",
  },
  {
    type: "task_update",
    timestamp: 2100,
    task_id: "t_001",
    status: "running",
  },
  {
    type: "tool_call",
    timestamp: 2400,
    task_id: "t_001",
    tool: "sec_search",
    input_summary: "Apple 10-K FY2023",
  },
  {
    type: "tool_result",
    timestamp: 3200,
    task_id: "t_001",
    tool: "sec_search",
    output_summary: "Found Apple 10-K 2023. Revenue: $383B. Net income: $97B. EPS: $6.13.",
  },
  {
    type: "partial_output",
    timestamp: 3600,
    task_id: "t_001",
    content: "Apple reported revenue of $383B and net income of $97B in FY2023, driven by Services growth.",
    is_final: false,
    quality_score: null,
  },
  {
    type: "task_update",
    timestamp: 4000,
    task_id: "t_001",
    status: "complete",
  },

  // Spawn parallel group
  {
    type: "task_spawned",
    timestamp: 4200,
    task_id: "t_002",
    label: "Fetch Microsoft FY2023 Financials",
    agent: "data-agent",
    parallel_group: "pg_1",
  },
  {
    type: "task_spawned",
    timestamp: 4300,
    task_id: "t_003",
    label: "Fetch Google FY2023 Financials",
    agent: "data-agent",
    parallel_group: "pg_1",
  },
  {
    type: "task_spawned",
    timestamp: 4400,
    task_id: "t_004",
    label: "Fetch Analyst Sentiment",
    agent: "data-agent",
    parallel_group: "pg_1",
  },

  // t_002 — Microsoft
  {
    type: "task_update",
    timestamp: 4600,
    task_id: "t_002",
    status: "running",
  },
  {
    type: "tool_call",
    timestamp: 4800,
    task_id: "t_002",
    tool: "sec_search",
    input_summary: "Microsoft 10-K FY2023",
  },

  // t_003 — Google
  {
    type: "task_update",
    timestamp: 4900,
    task_id: "t_003",
    status: "running",
  },
  {
    type: "tool_call",
    timestamp: 5100,
    task_id: "t_003",
    tool: "sec_search",
    input_summary: "Alphabet 10-K FY2023",
  },

  // t_004 — Analyst sentiment
  {
    type: "task_update",
    timestamp: 5200,
    task_id: "t_004",
    status: "running",
  },
  {
    type: "tool_call",
    timestamp: 5400,
    task_id: "t_004",
    tool: "news_search",
    input_summary: "Apple Microsoft Google analyst ratings 2023",
  },

  // t_002 result
  {
    type: "tool_result",
    timestamp: 5800,
    task_id: "t_002",
    tool: "sec_search",
    output_summary: "Microsoft 10-K 2023. Revenue: $211B. Net income: $73B. Cloud grew 22% YoY.",
  },
  {
    type: "partial_output",
    timestamp: 6000,
    task_id: "t_002",
    content: "Microsoft posted $211B revenue and $73B net income, with Azure cloud growing 22% YoY.",
    is_final: true,
    quality_score: 0.91,
  },
  {
    type: "task_update",
    timestamp: 6200,
    task_id: "t_002",
    status: "complete",
  },

  // t_003 result
  {
    type: "tool_result",
    timestamp: 6400,
    task_id: "t_003",
    tool: "sec_search",
    output_summary: "Alphabet 10-K 2023. Revenue: $308B. Net income: $74B. Search stable; Cloud inflecting.",
  },
  {
    type: "partial_output",
    timestamp: 6600,
    task_id: "t_003",
    content: "Google (Alphabet) reported $308B revenue and $74B net income, with Cloud division inflecting toward profitability.",
    is_final: true,
    quality_score: 0.87,
  },
  {
    type: "task_update",
    timestamp: 6800,
    task_id: "t_003",
    status: "complete",
  },

  // t_004 — rate-limit failure + retry + cancel
  {
    type: "tool_result",
    timestamp: 7000,
    task_id: "t_004",
    tool: "news_search",
    output_summary: "Rate limit exceeded.",
  },
  {
    type: "task_update",
    timestamp: 7100,
    task_id: "t_004",
    status: "failed",
    error: "Rate limit exceeded on news_search API.",
  },
  {
    type: "task_update",
    timestamp: 7600,
    task_id: "t_004",
    status: "running",
  },
  {
    type: "tool_call",
    timestamp: 7800,
    task_id: "t_004",
    tool: "news_search",
    input_summary: "Apple Microsoft Google analyst ratings 2023 (retry)",
  },
  {
    type: "task_update",
    timestamp: 8200,
    task_id: "t_004",
    status: "cancelled",
    reason: "sufficient_data",
    message: "Coordinator proceeding with available data.",
  },

  // Synthesis task
  {
    type: "task_spawned",
    timestamp: 8600,
    task_id: "t_005",
    label: "Synthesise Comparative Analysis",
    agent: "synthesis-agent",
    depends_on: ["t_001", "t_002", "t_003"],
  },
  {
    type: "task_update",
    timestamp: 8700,
    task_id: "t_005",
    status: "running",
  },
  {
    type: "agent_thought",
    timestamp: 8900,
    task_id: "t_005",
    content: "All primary data collected. Comparing margins, growth rates, and segment mix across three companies.",
  },
  {
    type: "tool_call",
    timestamp: 9100,
    task_id: "t_005",
    tool: "data_compare",
    input_summary: "Revenue, net income, growth — Apple vs Microsoft vs Google FY2023",
  },
  {
    type: "tool_result",
    timestamp: 9800,
    task_id: "t_005",
    tool: "data_compare",
    output_summary: "Apple leads on margin (25.3%). Microsoft leads on cloud growth. Google rebounding on ad revenue.",
  },
  {
    type: "partial_output",
    timestamp: 10100,
    task_id: "t_005",
    content: "Comparing financials across all three companies…",
    is_final: false,
    quality_score: null,
  },
  {
    type: "partial_output",
    timestamp: 10800,
    task_id: "t_005",
    content: "Apple leads peers on net margin at 25.3%. Microsoft shows the strongest cloud momentum (+22% Azure). Google's advertising recovery drove margin expansion despite regulatory headwinds. All three remain strong cash generators in FY2023.",
    is_final: true,
    quality_score: 0.94,
  },
  {
    type: "task_update",
    timestamp: 11000,
    task_id: "t_005",
    status: "complete",
  },
  {
    type: "run_complete",
    timestamp: 11400,
    output: {
      summary: "Apple leads on profitability (25.3% net margin, $383B revenue). Microsoft shows strongest cloud growth with Azure up 22%. Google rebounded on advertising with $308B revenue. All three are robust cash generators; Microsoft's cloud trajectory and Apple's margin profile stand out heading into FY2024.",
      citations: [
        { ref_id: "c1", title: "Apple 10-K 2023", source: "SEC", page: 48 },
        { ref_id: "c2", title: "Microsoft 10-K 2023", source: "SEC", page: 51 },
        { ref_id: "c3", title: "Alphabet 10-K 2023", source: "SEC", page: 44 },
      ],
    },
  },
];

export default runSuccess;