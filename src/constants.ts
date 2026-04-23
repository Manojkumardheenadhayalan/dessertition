import { NodeType, NodeTemplate } from './types';
import { Bot, Database, Zap, Cpu, Sparkles, Rocket } from 'lucide-react';

export const NODE_TEMPLATES: NodeTemplate[] = [
  // Free & Local Chat Models (PRIORITIZED)
  {
    type: 'llm' as NodeType,
    label: 'ChatOllama',
    description: 'Chat completion using open-source LLM on Ollama',
    icon: Bot,
    config: { baseUrl: 'http://localhost:11434', modelName: 'hermes3', temperature: 0.9, allowImageUploads: false, think: true }
  },
  {
    type: 'llm' as NodeType,
    label: 'LocalAI',
    description: 'Use local LLMs like llama.cpp, gpt4all using LocalAI',
    icon: Rocket,
    config: { baseUrl: 'http://localhost:8080', modelName: 'ggml-gpt4all-j' }
  },
  {
    type: 'llm' as NodeType,
    label: 'HuggingFace',
    description: 'Wrapper around HuggingFace large language models (Free Inference API)',
    icon: Bot,
    config: { apiKey: '', modelName: 'gpt2' }
  },
  {
    type: 'llm' as NodeType,
    label: 'LiteLLM',
    description: 'Connect to a Litellm server using OpenAI-compatible API',
    icon: Rocket,
    config: { baseUrl: 'http://localhost:8000', modelName: 'gpt-3.5-turbo' }
  },
  {
    type: 'llm' as NodeType,
    label: 'Google Gemini',
    description: 'Free tier wrapper around Google Gemini large language models',
    icon: Sparkles,
    config: { apiKey: '', modelName: 'gemini-1.5-pro' }
  },

  // Paid / Service Chat Models
  {
    type: 'llm' as NodeType,
    label: 'OpenAI',
    description: 'Wrapper around OpenAI large language models (Paid Service)',
    icon: Bot,
    config: { apiKey: '', modelName: 'gpt-4o' }
  },
  {
    type: 'llm' as NodeType,
    label: 'Anthropic Claude',
    description: 'Wrapper around ChatAnthropic large language models (Paid Service)',
    icon: Bot,
    config: { modelName: 'claude-3-opus-20240229', temperature: 0.7 }
  },
  {
    type: 'llm' as NodeType,
    label: 'OpenAI Custom Model',
    description: 'Custom/FineTuned model using OpenAI Chat compatible API',
    icon: Bot,
    config: { baseUrl: '', modelName: '' }
  },
  {
    type: 'llm' as NodeType,
    label: 'OpenRouter',
    description: 'Wrapper around Open Router Inference API',
    icon: Rocket,
    config: { apiKey: '', modelName: 'meta-llama/llama-3-70b-instruct' }
  },
  {
    type: 'llm' as NodeType,
    label: 'Perplexity',
    description: 'Wrapper around Perplexity large language models that use the Chat endpoint',
    icon: Sparkles,
    config: { apiKey: '', modelName: 'llama-3-sonar-large-32k-online' }
  },
  {
    type: 'llm' as NodeType,
    label: 'SambaNova',
    description: 'Wrapper around Sambanova Chat Endpoints',
    icon: Bot,
    config: { apiKey: '', modelName: 'Meta-Llama-3.1-70B-Instruct' }
  },
  {
    type: 'llm' as NodeType,
    label: 'TogetherAI',
    description: 'Wrapper around TogetherAI large language models',
    icon: Bot,
    config: { apiKey: '', modelName: 'mistralai/Mixtral-8x7B-Instruct-v0.1' }
  },
  {
    type: 'llm' as NodeType,
    label: 'xAI Grok',
    description: 'Wrapper around Grok from XAI',
    icon: Bot,
    config: { apiKey: '', modelName: 'grok-1' }
  },
  {
    type: 'llm' as NodeType,
    label: 'Deepseek',
    description: 'Wrapper around Deepseek large language models that use the Chat endpoint',
    icon: Bot,
    config: { apiKey: '', modelName: 'deepseek-chat' }
  },

  // Document Loaders
  {
    type: 'loader' as NodeType,
    label: 'API Loader',
    description: 'Load data from an API',
    icon: Database,
    config: { url: '', method: 'GET' }
  },
  {
    type: 'loader' as NodeType,
    label: 'Airtable',
    description: 'Load data from Airtable table',
    icon: Database,
    config: { apiKey: '', baseId: '', tableId: '' }
  },
  {
    type: 'loader' as NodeType,
    label: 'Apify Website Content Crawler',
    description: 'Load data from Apify Website Content Crawler',
    icon: Database,
    config: { apiToken: '', actorId: '' }
  },
  {
    type: 'loader' as NodeType,
    label: 'BraveSearch API Document Loader',
    description: 'Load and process data from BraveSearch results',
    icon: Database,
    config: { apiKey: '', query: '' }
  },
  {
    type: 'loader' as NodeType,
    label: 'Cheerio Web Scraper',
    description: 'Load data from webpages',
    icon: Database,
    config: { url: '' }
  },
  {
    type: 'loader' as NodeType,
    label: 'Confluence',
    description: 'Load data from a Confluence Document',
    icon: Database,
    config: { baseUrl: '', username: '', apiToken: '' }
  },
  {
    type: 'loader' as NodeType,
    label: 'Csv File',
    description: 'Load data from CSV files',
    icon: Database,
    config: { filePath: '' }
  },
  {
    type: 'loader' as NodeType,
    label: 'Custom Document Loader',
    description: 'Custom function for loading documents',
    icon: Database,
    config: { code: '' }
  },
  {
    type: 'memory' as NodeType,
    label: 'Document Store',
    description: 'Load data from pre-configured document stores',
    icon: Database,
    config: { storeId: '' }
  },
  {
    type: 'loader' as NodeType,
    label: 'Docx File',
    description: 'Load data from DOCX files',
    icon: Database,
    config: { filePath: '' }
  },
  {
    type: 'loader' as NodeType,
    label: 'Epub File',
    description: 'Load data from EPUB files',
    icon: Database,
    config: { filePath: '' }
  },
  {
    type: 'loader' as NodeType,
    label: 'Figma',
    description: 'Load data from a Figma file',
    icon: Database,
    config: { accessToken: '', fileKey: '' }
  },
  {
    type: 'loader' as NodeType,
    label: 'File Loader',
    description: 'A generic file loader that can load many formats',
    icon: Database,
    config: { filePath: '' }
  },
  {
    type: 'loader' as NodeType,
    label: 'FireCrawl',
    description: 'Load data from URL using FireCrawl',
    icon: Database,
    config: { apiKey: '', url: '' }
  },
  {
    type: 'loader' as NodeType,
    label: 'GitBook',
    description: 'Load data from GitBook',
    icon: Database,
    config: { baseUrl: '' }
  },
  {
    type: 'loader' as NodeType,
    label: 'Github',
    description: 'Load data from a GitHub repository',
    icon: Rocket,
    config: { repo: '', branch: 'main' }
  },
  {
    type: 'loader' as NodeType,
    label: 'Google Drive',
    description: 'Load documents from Google Drive files',
    icon: Database,
    config: { folderId: '' }
  },
  {
    type: 'loader' as NodeType,
    label: 'Google Sheets',
    description: 'Load data from Google Sheets as documents',
    icon: Database,
    config: { spreadsheetId: '' }
  },
  {
    type: 'loader' as NodeType,
    label: 'Jira',
    description: 'Load issues from Jira',
    icon: Database,
    config: { baseUrl: '', email: '', apiToken: '' }
  },
  {
    type: 'loader' as NodeType,
    label: 'Json File',
    description: 'Load data from JSON files',
    icon: Database,
    config: { filePath: '' }
  },
  {
    type: 'loader' as NodeType,
    label: 'Json Lines File',
    description: 'Load data from JSON Lines files',
    icon: Database,
    config: { filePath: '' }
  },
  {
    type: 'loader' as NodeType,
    label: 'Microsoft Excel',
    description: 'Load data from Microsoft Excel files',
    icon: Database,
    config: { filePath: '' }
  },
  {
    type: 'loader' as NodeType,
    label: 'Microsoft PowerPoint',
    description: 'Load data from Microsoft PowerPoint files',
    icon: Database,
    config: { filePath: '' }
  },

  // Chains & Memory
  {
    type: 'chain' as NodeType,
    label: 'Conversation Chain',
    description: 'Simple chain for conversation with memory',
    icon: Rocket,
    config: {}
  },
  {
    type: 'memory' as NodeType,
    label: 'Buffer Memory',
    description: 'Remembers all previous messages',
    icon: Cpu,
    config: {}
  },
  {
    type: 'memory' as NodeType,
    label: 'Window Memory',
    description: 'Only remembers the last K messages',
    icon: Cpu,
    config: { k: 5 }
  },
  {
    type: 'chain' as NodeType,
    label: 'InMemory Cache',
    description: 'Simple in-memory cache for models',
    icon: Cpu,
    config: {}
  },
  
  // Vector Stores
  {
    type: 'chain' as NodeType,
    label: 'Pinecone',
    description: 'Pinecone Vector Database',
    icon: Database,
    config: { apiKey: '', environment: '', indexName: '' }
  },
  {
    type: 'chain' as NodeType,
    label: 'Milvus',
    description: 'Milvus Vector Database',
    icon: Database,
    config: { url: '', collectionName: '' }
  },
  {
    type: 'chain' as NodeType,
    label: 'Chroma',
    description: 'Chroma Vector Database',
    icon: Database,
    config: { collectionName: '', url: 'http://localhost:8000' }
  },
  {
    type: 'chain' as NodeType,
    label: 'Hugging Face Vector Store',
    description: 'Hugging Face Inference based Vector DB',
    icon: Cpu,
    config: { apiKey: '', modelName: '' }
  },
  {
    type: 'chain' as NodeType,
    label: 'Supabase Vector',
    description: 'Postgres Vector Store using Supabase',
    icon: Database,
    config: { apiKey: '', url: '', tableName: 'documents' }
  },
];
