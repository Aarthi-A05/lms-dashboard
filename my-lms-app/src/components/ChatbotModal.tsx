import React, { useState, useContext } from 'react';
import { Modal, Box, TextField, Button, Typography, IconButton } from '@mui/material';
import { RoleContext } from '../contexts/RoleContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CloseIcon from '@mui/icons-material/Close';
import qaData from '../data/qa.json';

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

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: { xs: '90%', sm: '350px' },
          height: '500px',
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid #e0e0e0',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            bgcolor: 'primary.main',
            color: 'white',
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            Chat with {currentUser?.role} Assistant
          </Typography>
          <IconButton onClick={onClose} sx={{ color: 'white' }} aria-label="Close chatbot">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Messages Area */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            overflowY: 'auto',
            bgcolor: '#fafafa',
          }}
        >
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

        {/* Footer */}
        <Box
          sx={{
            flexShrink: 0,
            display: 'flex',
            gap: 1,
            p: 2,
            borderTop: '1px solid #e0e0e0',
            bgcolor: 'white',
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
          }}
        >
          <TextField
            fullWidth
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && handleSend()}
          />
          <Button
            variant="contained"
            onClick={handleSend}
            disabled={!input.trim()}
            aria-label="Send message button"
          >
            Send
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChatbotModal;
