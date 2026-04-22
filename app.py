import streamlit as st
import pandas as pd


st.set_page_config(
    page_title="Q-Platform",
    page_icon="Q",
    layout="wide",
    initial_sidebar_state="expanded",
)


st.markdown(
    """
    <style>
      :root {
        --ink: #f6fbfb;
        --muted: #9fb2b8;
        --line: rgba(168, 206, 211, .18);
        --paper: #081216;
        --panel: #101d23;
        --panel-strong: #142a31;
        --teal: #23c7bd;
        --teal-dark: #5ee0d6;
        --plum: #b98fca;
        --gold: #f0b64b;
        --coral: #ee785e;
      }
      .stApp {
        color: var(--ink);
        background:
          radial-gradient(circle at 20% 0%, rgba(35, 199, 189, .16), transparent 32rem),
          linear-gradient(180deg, #0b151a 0%, var(--paper) 45%, #071014 100%);
      }
      section[data-testid="stSidebar"] {
        border-right: 1px solid var(--line);
        background: #0a171c;
      }
      section[data-testid="stSidebar"] * {
        color: var(--ink);
      }
      .block-container {
        padding-top: 2rem;
      }
      h1, h2, h3, p, label, span, div {
        letter-spacing: 0;
      }
      div[data-testid="stMarkdownContainer"] p {
        color: var(--muted);
      }
      div[data-testid="stMetric"] {
        padding: 14px 16px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: rgba(16, 29, 35, .92);
        box-shadow: 0 14px 34px rgba(0, 0, 0, .18);
      }
      div[data-testid="stMetric"] label,
      div[data-testid="stMetric"] div {
        color: var(--ink);
      }
      .hero {
        padding: 28px 0 10px;
      }
      .eyebrow {
        color: var(--teal-dark);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: .04em;
        text-transform: uppercase;
      }
      .hero h1 {
        margin: 0 0 10px;
        max-width: 980px;
        font-size: 48px;
        line-height: 1.02;
        color: var(--ink);
      }
      .hero p {
        max-width: 840px;
        color: var(--muted);
        font-size: 17px;
        line-height: 1.55;
      }
      .panel {
        padding: 18px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: linear-gradient(180deg, rgba(20, 42, 49, .94), rgba(13, 25, 31, .94));
        box-shadow: 0 16px 40px rgba(0, 0, 0, .2);
      }
      .panel h3 {
        color: var(--ink);
      }
      .small-muted {
        color: var(--muted);
        font-size: 14px;
      }
      .badge {
        display: inline-block;
        margin: 0 8px 8px 0;
        padding: 5px 9px;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: rgba(255, 255, 255, .04);
        color: var(--muted);
        font-size: 12px;
        font-weight: 800;
      }
      .badge.live {
        border-color: rgba(35, 199, 189, .35);
        background: rgba(35, 199, 189, .12);
        color: var(--teal-dark);
      }
      .badge.warn {
        border-color: rgba(240, 182, 75, .38);
        background: rgba(240, 182, 75, .13);
        color: var(--gold);
      }
      .repo-card {
        padding: 16px;
        border-left: 4px solid var(--teal);
        border-radius: 8px;
        background: linear-gradient(135deg, rgba(20, 42, 49, .96), rgba(13, 25, 31, .96));
        box-shadow: 0 18px 46px rgba(0, 0, 0, .24);
      }
      .repo-card h3 {
        margin: 0 0 6px;
        color: var(--ink);
      }
      .step {
        padding: 14px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: rgba(16, 29, 35, .9);
      }
      .step strong {
        display: block;
        color: var(--ink);
      }
      .stTabs [data-baseweb="tab-list"] {
        gap: 8px;
      }
      .stTabs [data-baseweb="tab"] {
        border-radius: 8px;
        background: rgba(16, 29, 35, .92);
        border: 1px solid var(--line);
        color: var(--muted);
      }
      .stTabs [aria-selected="true"] {
        color: var(--ink);
        border-color: rgba(35, 199, 189, .42);
        background: rgba(35, 199, 189, .12);
      }
      div[data-baseweb="select"] > div,
      div[data-baseweb="input"] > div,
      div[data-baseweb="base-input"],
      textarea,
      input {
        color: var(--ink) !important;
        border-color: var(--line) !important;
        background: rgba(16, 29, 35, .96) !important;
      }
      div[data-baseweb="popover"],
      div[data-baseweb="menu"] {
        background: #101d23 !important;
        border: 1px solid var(--line);
      }
      div[role="option"] {
        color: var(--ink) !important;
        background: #101d23 !important;
      }
      div[role="option"]:hover {
        background: rgba(35, 199, 189, .16) !important;
      }
      button[kind="primary"],
      .stButton > button {
        border: 1px solid rgba(35, 199, 189, .38);
        border-radius: 8px;
        color: #061113;
        background: var(--teal);
        font-weight: 800;
      }
      .stButton > button:disabled {
        color: var(--muted);
        border-color: var(--line);
        background: rgba(255, 255, 255, .05);
      }
      div[data-testid="stDataFrame"] {
        border: 1px solid var(--line);
        border-radius: 8px;
        overflow: hidden;
      }
      div[data-testid="stAlert"] {
        border-radius: 8px;
        border: 1px solid var(--line);
        background: rgba(16, 29, 35, .96);
      }
    </style>
    """,
    unsafe_allow_html=True,
)


WORKSPACES = {
    "GridLab Ventures": {
        "repo": "battery-dispatch",
        "study": "Battery fleet dispatch",
        "dataset": "grid-load-v3.csv",
        "claim": "Hybrid quantum route improves dispatch cost under grid constraints.",
        "value": "$4.8M decision opportunity",
        "risk": "Must beat tuned classical baseline before any quantum spend scales.",
    },
    "Northstar Quant": {
        "repo": "portfolio-qubo",
        "study": "Portfolio risk allocation",
        "dataset": "portfolio-risk-2026.parquet",
        "claim": "QUBO formulation improves allocation quality under exposure caps.",
        "value": "$2.1M research opportunity",
        "risk": "Evidence must stay explainable to investment stakeholders.",
    },
}

RUNS = pd.DataFrame(
    [
        {"Run": "Baseline MIP", "Backend": "Local classical", "Quality": 88, "Runtime sec": 42, "Cost": 3, "Status": "Pass"},
        {"Run": "QAOA sweep", "Backend": "Qiskit Runtime", "Quality": 83, "Runtime sec": 118, "Cost": 34, "Status": "Review"},
        {"Run": "Sampler job", "Backend": "AWS Braket", "Quality": 86, "Runtime sec": 132, "Cost": 41, "Status": "Review"},
        {"Run": "Annealing search", "Backend": "D-Wave / hybrid", "Quality": 93, "Runtime sec": 76, "Cost": 16, "Status": "Pass"},
        {"Run": "Quantum kernel", "Backend": "PennyLane", "Quality": 81, "Runtime sec": 64, "Cost": 8, "Status": "Pass"},
    ]
)

CONNECTORS = [
    ("Jupyter notebooks", "Import notebooks and detect datasets, circuits, parameters, and claims.", "Included"),
    ("GitHub", "Sync scripts, notebooks, pull requests, and benchmark artifacts.", "Included"),
    ("Qiskit Runtime", "Run sampler and estimator jobs with normalized metadata.", "BYO account"),
    ("AWS Braket", "Submit managed quantum and hybrid jobs with spend tracking.", "BYO account"),
    ("PennyLane", "Bring QML workflows, templates, gradients, and metrics.", "Open source first"),
    ("D-Wave / annealing", "Benchmark annealing and hybrid solvers against baselines.", "BYO account"),
    ("Datasets", "Attach CSV, Parquet, S3, warehouse exports, checksums, and lineage.", "Included"),
    ("Local simulators", "Run smoke tests and budget-free validation before cloud hardware.", "Included"),
]

CLAIMS = [
    ("Quantum route beats baseline", "Blocked", "Missing repeatability across seeds."),
    ("Cost remains inside pilot budget", "Review", "Cloud spend estimate needs approval."),
    ("Workflow is reproducible", "Ready", "Dataset, parameters, logs, and commit are attached."),
]


def init_state():
    if "repo_name" not in st.session_state:
        st.session_state.repo_name = "battery-dispatch-pilot"
    if "template" not in st.session_state:
        st.session_state.template = "Optimization benchmark"
    if "connected" not in st.session_state:
        st.session_state.connected = {"Jupyter notebooks", "GitHub", "Datasets", "Local simulators"}
    if "budget_limit" not in st.session_state:
        st.session_state.budget_limit = 75


def badge(text, kind=""):
    st.markdown(f'<span class="badge {kind}">{text}</span>', unsafe_allow_html=True)


def panel(title, body, badges=None):
    badge_html = ""
    for item, kind in badges or []:
        badge_html += f'<span class="badge {kind}">{item}</span>'
    st.markdown(
        f"""
        <div class="panel">
          {badge_html}
          <h3>{title}</h3>
          <p class="small-muted">{body}</p>
        </div>
        """,
        unsafe_allow_html=True,
    )


def sidebar():
    with st.sidebar:
        st.markdown("## Q-Platform")
        st.caption("Quantum Evidence OS")
        workspace = st.selectbox("Workspace", list(WORKSPACES.keys()))
        st.divider()
        st.markdown("### Current study")
        st.write(WORKSPACES[workspace]["study"])
        st.caption(WORKSPACES[workspace]["risk"])
        st.divider()
        st.markdown("### Build mode")
        st.radio("User type", ["Solo researcher", "Startup team", "Enterprise lab"], index=1)
        return workspace


def hero():
    st.markdown(
        """
        <div class="hero">
          <div class="eyebrow">Q-Platform / Quantum Evidence OS</div>
          <h1>Prove quantum value before teams spend serious money.</h1>
          <p>
            A collaborative platform where teams create Q-Repos, model optimization
            problems, build circuits, run classical and quantum benchmarks, review
            claims, and package investor-grade evidence in one place.
          </p>
        </div>
        """,
        unsafe_allow_html=True,
    )


def repo_overview(workspace):
    data = WORKSPACES[workspace]
    st.markdown(
        f"""
        <div class="repo-card">
          <span class="badge live">Private Q-Repo</span>
          <span class="badge">main</span>
          <span class="badge">a18c9f2</span>
          <h3>{workspace} / {data["repo"]}</h3>
          <p class="small-muted">{data["claim"]}</p>
        </div>
        """,
        unsafe_allow_html=True,
    )
    a, b, c, d = st.columns(4)
    a.metric("Evidence score", "74%", "+9")
    b.metric("Selected checks", "5", "+1")
    c.metric("Connected tools", str(len(st.session_state.connected)), "+2")
    d.metric("Decision value", data["value"])


def q_repo_tab():
    st.subheader("Create a Q-Repo")
    left, right = st.columns([1, 1])
    with left:
        st.session_state.repo_name = st.text_input("Repo name", st.session_state.repo_name)
        st.session_state.template = st.selectbox(
            "Use case",
            ["Optimization benchmark", "Quantum anomaly detection", "Circuit validation", "Simulation study"],
        )
        primary_claim = st.text_input("Primary claim", "Hybrid quantum route improves measurable business outcome.")
        if st.button("Create Q-Repo", type="primary"):
            st.success(f"Q-Repo `{st.session_state.repo_name}` created with template `{st.session_state.template}`.")
    with right:
        panel("Repository contract", "Every Q-Repo stores model versions, datasets, solver configs, runs, claims, reviews, and reports.", [("GitHub-like", "live")])
        panel("Who can use it", "Solo researchers can run local experiments. Teams can review, branch, comment, and approve evidence before sharing.", [("Solo + team", "")])
    st.markdown("#### Workflow")
    cols = st.columns(5)
    steps = ["Create Q-Repo", "Commit model", "Build circuits", "Run CI checks", "Merge evidence"]
    for index, step in enumerate(steps, start=1):
        cols[index - 1].markdown(f'<div class="step"><span>0{index}</span><strong>{step}</strong></div>', unsafe_allow_html=True)


def connectors_tab():
    st.subheader("Connectors")
    st.caption("Q-Platform should start free/local, then require explicit approval before paid cloud backends run.")
    cols = st.columns(2)
    for index, (name, description, mode) in enumerate(CONNECTORS):
        with cols[index % 2]:
            connected = name in st.session_state.connected
            state = "Connected" if connected else "Connect"
            panel(name, description, [(mode, "warn" if "BYO" in mode else "live"), (state, "live" if connected else "")])
            if st.button(state, key=f"connector-{name}", disabled=connected):
                st.session_state.connected.add(name)
                st.rerun()


def model_tab():
    st.subheader("Q-Model and Circuit Studio")
    left, right = st.columns([1, 1])
    with left:
        template = st.radio("Model template", ["QAOA optimization", "Quantum anomaly detection", "VQE simulation"], horizontal=True)
        st.markdown("#### Problem graph")
        graph = pd.DataFrame(
            [
                {"Node": "Dataset", "Role": "Input", "Weight": 0.8},
                {"Node": "Objective", "Role": "Optimize", "Weight": 1.0},
                {"Node": "Constraints", "Role": "Validate", "Weight": 0.9},
                {"Node": "Classical baseline", "Role": "Compare", "Weight": 0.7},
                {"Node": "Quantum candidate", "Role": "Compare", "Weight": 0.7},
            ]
        )
        st.dataframe(graph, use_container_width=True, hide_index=True)
    with right:
        st.markdown("#### Circuit plan")
        if template == "Quantum anomaly detection":
            circuit = pd.DataFrame({"Qubit": ["q0", "q1", "q2", "q3"], "Gates": ["H - RY - ZZFeatureMap", "H - RZ - CX", "RY - RZ - Measure", "H - CX - Measure"]})
        elif template == "VQE simulation":
            circuit = pd.DataFrame({"Qubit": ["q0", "q1", "q2", "q3"], "Gates": ["RY - RZ - CX", "RY - CX - RY", "RZ - CX - Measure", "RY - RZ - Measure"]})
        else:
            circuit = pd.DataFrame({"Qubit": ["q0", "q1", "q2", "q3"], "Gates": ["H - RZZ - RX", "H - CX - RX", "H - RZZ - Measure", "H - CX - Measure"]})
        st.dataframe(circuit, use_container_width=True, hide_index=True)
        st.info("Circuit commits should become reviewable artifacts, like pull requests for quantum experiments.")


def bench_tab():
    st.subheader("Q-Bench")
    selected = st.multiselect("Backends to compare", RUNS["Backend"].tolist(), default=RUNS["Backend"].tolist())
    filtered = RUNS[RUNS["Backend"].isin(selected)]
    st.dataframe(filtered, use_container_width=True, hide_index=True)
    chart_metric = st.radio("Chart metric", ["Quality", "Runtime sec", "Cost"], horizontal=True)
    st.bar_chart(filtered.set_index("Run")[[chart_metric]])
    st.markdown("#### Cost guard")
    st.session_state.budget_limit = st.slider("Require approval above estimated spend", 0, 250, st.session_state.budget_limit)
    estimated = int(filtered["Cost"].sum())
    if estimated > st.session_state.budget_limit:
        st.warning(f"Estimated provider spend is ${estimated}, above the ${st.session_state.budget_limit} approval gate.")
    else:
        st.success(f"Estimated provider spend is ${estimated}, inside the current approval gate.")


def collab_tab():
    st.subheader("Q-Collab")
    left, right = st.columns([1, 1])
    with left:
        st.markdown("#### Review queue")
        reviews = pd.DataFrame(
            [
                {"Item": "PR #14 QAOA sweep", "Owner": "Maya", "State": "Changes requested"},
                {"Item": "Baseline audit", "Owner": "Riya", "State": "Required"},
                {"Item": "Investor evidence pack", "Owner": "Dev", "State": "Draft"},
            ]
        )
        st.dataframe(reviews, use_container_width=True, hide_index=True)
    with right:
        st.markdown("#### Comments")
        st.chat_message("user").write("Need stronger local-search baseline before we claim advantage.")
        st.chat_message("assistant").write("Added as a required CI check and blocked the claim until it passes.")
        st.chat_input("Add review comment")


def trust_tab():
    st.subheader("Trust Layer")
    cols = st.columns(4)
    cols[0].metric("Baseline fairness", "Needs work", "2 gaps")
    cols[1].metric("Reproducibility", "82%", "+11")
    cols[2].metric("Claim risk", "Medium", "-1")
    cols[3].metric("Budget confidence", "High")
    st.markdown("#### Claim ledger")
    for claim, state, note in CLAIMS:
        panel(claim, note, [(state, "live" if state == "Ready" else "warn")])


def automation_tab():
    st.subheader("Automations")
    automations = pd.DataFrame(
        [
            {"Automation": "Nightly baseline regression", "Trigger": "Every night", "Output": "CI status"},
            {"Automation": "Cloud spend guard", "Trigger": "Before paid backend", "Output": "Approval gate"},
            {"Automation": "Evidence pack builder", "Trigger": "On merge", "Output": "Report draft"},
            {"Automation": "Drift monitor", "Trigger": "New dataset", "Output": "Review task"},
        ]
    )
    st.dataframe(automations, use_container_width=True, hide_index=True)
    if st.button("Run required checks", type="primary"):
        st.success("Required checks queued: baseline fairness, repeatability, cost guard, artifact completeness.")


def reports_tab(workspace):
    st.subheader("Reports and data room")
    data = WORKSPACES[workspace]
    panel("Decision memo", f"Summarizes whether `{data['repo']}` has enough evidence to justify quantum/hybrid spend.", [("Board-ready", "live")])
    panel("Investor data room", "Packages claims, baselines, run metadata, costs, notebooks, and reviewer sign-off.", [("Shareable", "")])
    if st.button("Build evidence pack", type="primary"):
        st.success("Evidence pack drafted with reproducibility checklist and provider cost appendix.")


init_state()
workspace_name = sidebar()
hero()
repo_overview(workspace_name)

tabs = st.tabs(["Q-Repos", "Connectors", "Q-Model", "Q-Bench", "Q-Collab", "Trust", "Automations", "Reports"])
with tabs[0]:
    q_repo_tab()
with tabs[1]:
    connectors_tab()
with tabs[2]:
    model_tab()
with tabs[3]:
    bench_tab()
with tabs[4]:
    collab_tab()
with tabs[5]:
    trust_tab()
with tabs[6]:
    automation_tab()
with tabs[7]:
    reports_tab(workspace_name)
