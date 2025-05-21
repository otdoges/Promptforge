import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Gradient } from '@/components/ui/Gradient';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatInterfaceProps {
  systemPrompt?: string;
  onSendMessage?: (message: string) => Promise<string>;
  placeholder?: string;
}

export function ChatInterface({
  systemPrompt = 'I am an AI assistant that helps you with coding and app creation.',
  onSendMessage,
  placeholder = 'Ask me how to build your app...',
}: ChatInterfaceProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: 'Hi there! I\'m your AI coding assistant. Tell me what kind of app you want to create, and I\'ll help you build it!',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const generateMessageId = () => {
    return Date.now().toString();
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;
    
    const userMessage: Message = {
      id: generateMessageId(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage('');
    Keyboard.dismiss();
    
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
    
    if (onSendMessage) {
      setIsLoading(true);
      try {
        const response = await onSendMessage(inputMessage);
        
        const aiMessage: Message = {
          id: generateMessageId(),
          text: response,
          sender: 'ai',
          timestamp: new Date(),
        };
        
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
        
        if (flatListRef.current) {
          setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }, 100);
        }
      } catch {
        // Handle error
        const errorMessage: Message = {
          id: generateMessageId(),
          text: 'Sorry, I encountered an error. Please try again.',
          sender: 'ai',
          timestamp: new Date(),
        };
        
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isAI = item.sender === 'ai';
    
    return (
      <View 
        style={[
          styles.messageContainer,
          isAI ? styles.aiMessageContainer : styles.userMessageContainer,
        ]}
      >
        {isAI ? (
          <View style={styles.messageContent}>
            <Text style={[styles.messageText, { color: colors.text }]}>{item.text}</Text>
          </View>
        ) : (
          <Gradient 
            variant="primary" 
            intensity="light" 
            style={styles.userGradient}
          >
            <Text style={[styles.messageText, { color: '#FFF' }]}>{item.text}</Text>
          </Gradient>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      />
      
      <BlurView intensity={80} tint={colorScheme === 'dark' ? 'dark' : 'light'} style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            { 
              color: colors.text,
              backgroundColor: colors.inputBackground,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholderText}
          value={inputMessage}
          onChangeText={setInputMessage}
          multiline
          maxLength={1000}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            { backgroundColor: colors.tint },
            (!inputMessage.trim() || isLoading) && styles.disabledButton,
          ]}
          onPress={handleSendMessage}
          disabled={!inputMessage.trim() || isLoading}
        >
          {isLoading ? (
            <IconSymbol name="ellipsis" size={20} color="#FFFFFF" />
          ) : (
            <IconSymbol name="paperplane.fill" size={20} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </BlurView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  messageContainer: {
    marginVertical: 8,
    maxWidth: '80%',
  },
  aiMessageContainer: {
    alignSelf: 'flex-start',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  messageContent: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    padding: 12,
    borderTopLeftRadius: 4,
  },
  userGradient: {
    padding: 12,
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 120,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
