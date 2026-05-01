const run_error_fixture = [
  {
    type: "run_started",
    timestamp: 1000,
    run_id: "run_a1b2c3d4",
    query: "Analyze Q3 financial performance for Microsoft, Apple, and generate a comparative summary report.",
  },

  {
    type: "agent_thought",
    timestamp: 2000,
    agent: "coordinator",
    thought:
      "I'll break this into sequential and parallel sub-tasks: first fetch Microsoft data independently, then concurrently fetch Apple data and retrieve benchmark indices, before synthesizing a final report.",
  },

  {
    type: "task_spawned",
    timestamp: 3000,
    task_id: "t_001",
    label: "Fetch Microsoft Q3 financial data",
    agent: "financial_agent",
    depends_on: [],
  },

  {
    type: "task_update",
    timestamp: 4000,
    task_id: "t_001",
    status: "running",
  },

  {
    type: "tool_call",
    timestamp: 5000,
    task_id: "t_001",
    tool: "financial_data_api",
    input: {
      ticker: "MSFT",
      period: "Q3_2024",
      metrics: ["revenue", "net_income", "operating_margin", "eps"],
    },
  },

  {
    type: "tool_result",
    timestamp: 6000,
    task_id: "t_001",
    tool: "financial_data_api",
    success: true,
    output: {
      ticker: "MSFT",
      period: "Q3_2024",
      revenue: "64.7B",
      net_income: "21.9B",
      operating_margin: "44.0%",
      eps: 2.94,
    },
  },

  {
    type: "partial_output",
    timestamp: 7000,
    task_id: "t_001",
    is_final: false,
    content:
      "Microsoft Q3 2024: Revenue $64.7B (+17% YoY), Net Income $21.9B, Operating Margin 44.0%, EPS $2.94. Cloud segment remains primary growth driver.",
  },

  {
    type: "task_spawned",
    timestamp: 8000,
    task_id: "t_002",
    label: "Fetch Apple Q3 financial data",
    agent: "financial_agent",
    parallel_group: "pg_1",
    depends_on: [],
  },

  {
    type: "task_spawned",
    timestamp: 8100,
    task_id: "t_003",
    label: "Retrieve sector benchmark indices",
    agent: "market_agent",
    parallel_group: "pg_1",
    depends_on: [],
  },

  {
    type: "task_update",
    timestamp: 9000,
    task_id: "t_002",
    status: "running",
  },

  {
    type: "task_update",
    timestamp: 9100,
    task_id: "t_003",
    status: "running",
  },

  {
    type: "tool_call",
    timestamp: 10000,
    task_id: "t_002",
    tool: "financial_data_api",
    input: {
      ticker: "AAPL",
      period: "Q3_2024",
      metrics: ["revenue", "net_income", "operating_margin", "eps"],
    },
  },

  {
    type: "tool_result",
    timestamp: 11000,
    task_id: "t_002",
    tool: "financial_data_api",
    success: true,
    output: {
      ticker: "AAPL",
      period: "Q3_2024",
      revenue: "85.8B",
      net_income: "21.4B",
      operating_margin: "29.6%",
      eps: 1.40,
    },
  },

  {
    type: "partial_output",
    timestamp: 12000,
    task_id: "t_002",
    is_final: true,
    quality_score: 0.93,
    content:
      "Apple Q3 2024: Revenue $85.8B (+5% YoY), Net Income $21.4B, Operating Margin 29.6%, EPS $1.40. Services segment reached all-time revenue high of $24.2B.",
  },

  {
    type: "task_update",
    timestamp: 13000,
    task_id: "t_002",
    status: "complete",
  },

  {
    type: "tool_call",
    timestamp: 13500,
    task_id: "t_003",
    tool: "market_index_api",
    input: {
      indices: ["XLK", "SP500_TECH"],
      period: "Q3_2024",
      metrics: ["return", "pe_ratio", "volatility"],
    },
  },

  {
    type: "run_error",
    timestamp: 15000,
    run_id: "run_a1b2c3d4",
    message:
      "Coordinator encountered an unrecoverable error. Partial results may be available.",
    failed_task_id: "t_003",
    error_code: "COORDINATOR_FAULT",
  },
];

export default run_error_fixture;