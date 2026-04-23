/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Chatflow {
  id: string;
  name: string;
  description: string;
  nodes: any[];
  edges: any[];
  updatedAt: string;
}

export type NodeType = 'llm' | 'memory' | 'loader' | 'chain';

export interface NodeTemplate {
  type: NodeType;
  label: string;
  description: string;
  icon: any;
  config: Record<string, any>;
}

export interface NodeData extends NodeTemplate {}
