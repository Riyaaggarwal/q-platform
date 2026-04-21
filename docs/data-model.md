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
