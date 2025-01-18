import React, { useState, useEffect, useRef } from "react";
import decisionTreeEnglish from "./mobileDecisionTreeEnglish.json";
import decisionTreeSpanish from "./mobileDecisionTreeSpanish.json"; // Import Spanish decision tree
import "./MobileDecisionTreeChat.css";

interface ChatMessage {
    type: "bot" | "user";
    content: React.ReactNode; // Support for formatted messages
    bold?: boolean; // Optional: Whether the message should be bold
}

interface DecisionTreeChatProps {
    currentLanguage: string; // Add currentLanguage prop
}

const DecisionTreeChat: React.FC<DecisionTreeChatProps> = ({
    currentLanguage,
}) => {
    const [currentNode, setCurrentNode] = useState("start"); // Current tree node
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]); // Chat history
    const [historyStack, setHistoryStack] = useState<string[]>([]); // History for "Go Back"
    const chatEndRef = useRef<HTMLDivElement | null>(null); // Reference for scrolling
    const initialMessageSent = useRef(false); // Track if the initial message has been sent

    // Determine which decision tree to use based on the current language
    const decisionTree =
        currentLanguage === "es" ? decisionTreeSpanish : decisionTreeEnglish;

    // Format the message with bold text and links
    const formatMessage = (
        message: (
            | string
            | {
                  type: string;
                  text?: string;
                  url?: string;
                  src?: string;
                  alt?: string;
              }
        )[]
    ): React.ReactNode => {
        return message.map((part, index) => {
            if (typeof part === "string") {
                return <span key={index}>{part}</span>;
            }
            if (part.type === "bold") {
                return <strong key={index}>{part.text}</strong>;
            }
            if (part.type === "link") {
                return (
                    <a
                        key={index}
                        href={part.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{
                            color: "#74ABFF",
                            textDecoration: "underline",
                        }}
                    >
                        {part.text}
                    </a>
                );
            }
            if (part.type === "image") {
                return (
                    <img
                        key={index}
                        src={part.src}
                        alt={part.alt || "Image"}
                        style={{ maxWidth: "100%", marginTop: "10px" }}
                    />
                );
            }
            return null; // Fallback for unsupported types
        });
    };

    // Scroll to the bottom whenever chatHistory changes
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatHistory]);

    // Send the first message when the component mounts
    useEffect(() => {
        if (!initialMessageSent.current) {
            initialMessageSent.current = true; // Mark as sent
            const initialNode = decisionTree[currentNode];
            if (initialNode) {
                setChatHistory((prev) => [
                    ...prev,
                    {
                        type: "bot",
                        content: Array.isArray(initialNode.message)
                            ? formatMessage(initialNode.message)
                            : initialNode.message,
                    },
                ]);
            }
        }
    }, []); // Empty dependency array ensures it runs only once

    useEffect(() => {
        // If user changes language after the chat has started,
        // re-initialize or re-render the messages in the new language
        handleRestart();
    }, [currentLanguage]);

    // Handle user option selection
    const handleOptionClick = (option: { label: string; next: string }) => {
        const sendMessages = (nodeKey: string) => {
            const node = decisionTree[nodeKey];

            setChatHistory((prev) => [
                ...prev,
                {
                    type: "bot",
                    content: Array.isArray(node.message)
                        ? formatMessage(node.message)
                        : node.message,
                },
            ]);

            // If there's a `next` property, recursively call `sendMessages`
            if (node.next) {
                setTimeout(() => {
                    setHistoryStack((prev) => [...prev, nodeKey]); // Save current node to history
                    sendMessages(node.next); // Recursively send the next message
                }, 500); // Optional delay for better UX
            } else if (node.options && node.options.length > 0) {
                // Stop recursion and wait for user interaction if there are options
                setCurrentNode(nodeKey);
            }
        };

        // Add user's choice to the chat history
        setChatHistory((prev) => [
            ...prev,
            { type: "user", content: option.label },
        ]);

        setHistoryStack((prev) => [...prev, currentNode]); // Save current node to history
        sendMessages(option.next); // Start the bot message sequence
    };

    // Go back to the previous node
    const handleGoBack = () => {
        if (historyStack.length > 0) {
            const previousNode = historyStack[historyStack.length - 1];
            setHistoryStack((prev) => prev.slice(0, -1)); // Remove the last node from history
            setCurrentNode(previousNode); // Set the current node to the previous one

            const node = decisionTree[previousNode];
            setChatHistory((prev) => [
                ...prev,
                {
                    type: "bot",
                    content: Array.isArray(node.message)
                        ? formatMessage(node.message)
                        : node.message,
                    bold: node.options.length === 0,
                },
            ]);
        }
    };

    // Restart the decision tree
    const handleRestart = () => {
        setCurrentNode("start");
        setChatHistory([
            {
                type: "bot",
                content: Array.isArray(decisionTree["start"].message)
                    ? formatMessage(decisionTree["start"].message)
                    : decisionTree["start"].message,
            },
        ]); // Reset to the start message
        setHistoryStack([]); // Clear history
    };

    const currentOptions =
        decisionTree[currentNode]?.options &&
        Array.isArray(decisionTree[currentNode]?.options)
            ? decisionTree[currentNode]?.options
            : [];
    const hasOptions = currentOptions.length > 0;

    return (
        <div className='chat-container'>
            <div className='chat-history'>
                {chatHistory.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-message ${
                            msg.type === "bot" ? "bot" : "user"
                        }`}
                        style={{
                            fontWeight: msg.bold ? "bold" : "normal",
                        }}
                    >
                        {msg.content}
                    </div>
                ))}
                <div ref={chatEndRef} />{" "}
                {/* This div will be scrolled into view */}
            </div>
            <div className='chat-input'>
                {hasOptions &&
                    currentOptions.map((option, index) => (
                        <button
                            key={index}
                            className='chat-option decision-tree-option'
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </button>
                    ))}
                <div className='icons-container'>
                    <div className='divider' />

                    {historyStack.length > 1 && (
                        <button
                            className='chat-option go-back'
                            onClick={handleGoBack}
                        >
                            <i className='fas fa-backward'></i>
                        </button>
                    )}
                    <button
                        className='chat-option restart'
                        onClick={handleRestart}
                    >
                        <i className='fas fa-rotate-right'></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DecisionTreeChat;
