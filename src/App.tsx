import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './views/Dashboard';
import { Builder } from './views/Builder';
import { Marketplace } from './views/Marketplace';
import { PlaceholderView } from './views/PlaceholderView';
import { 
  Rocket, 
  History, 
  Users, 
  Wrench, 
  Lock, 
  Variable, 
  Key, 
  Database, 
  Library 
} from 'lucide-react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-[#020617] min-h-screen text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen relative overflow-hidden">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/marketplaces" element={<Layout><Marketplace /></Layout>} />
        <Route path="/canvas/:id" element={<Builder />} />
        
        {/* Functional Placeholder Routes */}
        <Route path="/agents" element={<Layout>
          <PlaceholderView title="Agentflows" description="Orchestrate multiple agents and complex autonomous tasks." icon={Rocket} />
        </Layout>} />
        <Route path="/executions" element={<Layout>
          <PlaceholderView title="Executions" description="Track and monitor your historical flow runs and logs." icon={History} />
        </Layout>} />
        <Route path="/assistants" element={<Layout>
          <PlaceholderView title="Assistants" description="Manage your AI personas and system personalities." icon={Users} />
        </Layout>} />
        <Route path="/tools" element={<Layout>
          <PlaceholderView title="Tools" description="Custom functions and external API integrations for your agents." icon={Wrench} />
        </Layout>} />
        <Route path="/credentials" element={<Layout>
          <PlaceholderView title="Credentials" description="Securely store and manage your third-party API keys." icon={Lock} />
        </Layout>} />
        <Route path="/variables" element={<Layout>
          <PlaceholderView title="Variables" description="Global session and environment variables for your flows." icon={Variable} />
        </Layout>} />
        <Route path="/api-keys" element={<Layout>
          <PlaceholderView title="API Keys" description="Access your Manoj Chatbot Builder instance via REST API." icon={Key} />
        </Layout>} />
        <Route path="/document-stores" element={<Layout>
          <PlaceholderView title="Document Stores" description="Vector databases and long-term document repositories." icon={Database} />
        </Layout>} />
        <Route path="/datasets" element={<Layout>
          <PlaceholderView title="Datasets" description="Fine-tuning data and evaluation sets for your models." icon={Library} />
        </Layout>} />

        <Route path="*" element={<Layout><Dashboard /></Layout>} />
      </Routes>
    </Router>
  );
}
