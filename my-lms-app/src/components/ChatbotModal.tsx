import React, { useState, useContext } from 'react';
import { Modal, Box, TextField, Button, Typography, IconButton } from '@mui/material';
import { RoleContext } from '../contexts/RoleContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import qaData from '../data/qa.json';

// Type definitions
interface QAItem {
  q: string;
  a: string;
  chart?: { data: { name: string; value: number }[] };
}

interface QAData {
  [key: string]: QAItem[];
}

interface Message {
  user?: string;
  bot?: string;
  botChart?: React.ReactNode;
  timestamp: string;
}

interface ChatbotModalProps {
  open: boolean;
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ open, onClose }) => {
  const context = useContext(RoleContext);
  const { currentUser } = context || { currentUser: null };
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) {
      setMessages(prev => [...prev, { bot: "Please enter a valid question.", timestamp: new Date().toLocaleTimeString() }]);
      return;
    }

    const roleQa = (qaData as QAData)[currentUser?.role.toLowerCase() || ''];
    const intentQa = qaData.intents || [];
    let response = roleQa?.find(item => item.q.toLowerCase() === input.toLowerCase());
    if (!response) {
      response = intentQa.find(item => item.q.toLowerCase() === input.toLowerCase());
    }

    const newMessages = [...messages, { user: input, timestamp: new Date().toLocaleTimeString() }];
    if (response) {
      newMessages.push({ bot: response.a, timestamp: new Date().toLocaleTimeString() });
      if (response.chart) {
        newMessages.push({
          botChart: (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={response.chart.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          ),
          timestamp: new Date().toLocaleTimeString(),
        });
      }
    } else {
      newMessages.push({
        bot: "Sorry, I don’t understand. Try 'Show my weekly progress', 'Show usage stats', 'hello', or 'help'.",
        timestamp: new Date().toLocaleTimeString(),
      });
    }

    setMessages(newMessages);
    setInput('');
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '70%', md: '50%' },
          maxHeight: '80vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          overflowY: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Chat with {currentUser?.role} Assistant
          </Typography>
          <IconButton onClick={handleClear} color="error">
            Clear Chat
          </IconButton>
        </Box>
        <Box sx={{ mb: 2, maxHeight: '60vh', overflowY: 'auto' }}>
          {messages.map((msg, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              {msg.user && (
                <Typography sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  You ({msg.timestamp}): {msg.user}
                </Typography>
              )}
              {msg.bot && (
                <Typography sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
                  Bot ({msg.timestamp}): {msg.bot}
                </Typography>
              )}
              {msg.botChart && (
                <Box sx={{ mt: 1, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>{msg.botChart}</Box>
              )}
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && handleSend()}
            error={!input.trim() && messages.length > 0 && messages[messages.length - 1].bot === "Please enter a valid question."}
            helperText={!input.trim() && messages.length > 0 && messages[messages.length - 1].bot === "Please enter a valid question." ? "Input cannot be empty" : ""}
          />
          <Button variant="contained" onClick={handleSend} disabled={!input.trim()}>
            Send
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChatbotModal;