# Domain Model

## Workspace

Represents a team or organization.

- id
- name
- members
- permissions
- projects
- billing or usage metadata

## Project

A product, research area, customer engagement, or grant effort.

- id
- workspace_id
- name
- description
- tags
- datasets
- experiments
- reports

## Q-Repo

The GitHub-like product primitive. A Q-Repo can map to a project or sit under one.

- id
- workspace_id
- name
- owner
- visibility
- default_branch
- problem_family
- description
- created_by

## Branch

An experiment variant.

- id
- repo_id
- name
- base_branch
- head_commit
- status

## Commit

A versioned change to model, dataset, solver plan, or report content.

- id
- repo_id
- branch_id
- sha
- message
- author
- changed_files
- created_at

## Circuit Artifact

A versioned quantum circuit inside a Q-Repo.

- id
- repo_id
- commit_sha
- name
- representation
- qubit_count
- gate_count
- depth
- parameter_count
- target_backends
- source_uri
- transpiled_artifacts_uri

## Pipeline

A reusable experiment workflow, such as optimization benchmarking or anomaly detection.

- id
- repo_id
- name
- pipeline_type
- input_schema
- stages
- required_checks
- owner

## Anomaly Detector

A detector configuration for quantum and classical anomaly workflows.

- id
- pipeline_id
- detector_type
- encoding_strategy
- feature_map
- baseline_methods
- metrics
- threshold_policy

## Dataset

Versioned data used by one or more experiments.

- id
- project_id
- name
- source
- schema
- checksum
- version
- storage_uri
- created_by

## Problem Model

The optimization formulation.

- id
- project_id
- template_type
- variables
- objective
- constraints
- parser_source
- exported_formats

## Experiment

The reproducible parent object.

- id
- project_id
- model_id
- dataset_id
- name
- hypothesis
- status
- owner
- created_at
- version

## Run

A single solver execution.

- id
- experiment_id
- solver_adapter
- backend
- parameters
- environment_hash
- status
- submitted_at
- completed_at
- logs_uri
- artifacts_uri

## Q-Check

A solver run represented as a required check on a branch or review.

- id
- repo_id
- branch_id
- commit_sha
- run_id
- check_type
- status
- required
- summary
- logs_uri
- artifacts_uri
- budget_estimate

## Metrics

Normalized comparison layer.

- run_id
- objective_value
- feasibility
- constraint_violations
- runtime_seconds
- queue_seconds
- cost_estimate
- confidence
- notes

## Review

Q-Collab workflow object.

- id
- experiment_id
- repo_id
- source_branch
- target_branch
- reviewer
- status
- comments
- decision
- created_at

## Report

Shareable evidence package.

- id
- project_id
- experiment_ids
- summary
- charts
- exported_uri
- visibility
