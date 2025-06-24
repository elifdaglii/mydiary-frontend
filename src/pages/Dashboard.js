import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { entryAPI } from '../services/api';

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const data = await entryAPI.getAll();
      setEntries(data);
    } catch (err) {
      setError('Failed to load entries');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await entryAPI.delete(id);
        setEntries(entries.filter(entry => entry.id !== id));
      } catch (err) {
        setError('Failed to delete entry');
      }
    }
  };

  // Filter entries based on search term
  const filteredEntries = entries.filter(entry => {
    const searchLower = searchTerm.toLowerCase();
    const entryDate = new Date(entry.createdAt);
    const dateString = entryDate.toLocaleDateString('tr-TR'); // 24.06.2025
    const dateStringEn = entryDate.toLocaleDateString('en-US'); // 6/24/2025
    const year = entryDate.getFullYear().toString(); // 2025
    const month = entryDate.toLocaleDateString('en-US', { month: 'long' }).toLowerCase(); // june
    const monthTr = entryDate.toLocaleDateString('tr-TR', { month: 'long' }).toLowerCase(); // haziran
    const day = entryDate.getDate().toString(); // 24
    
    return (
      entry.title.toLowerCase().includes(searchLower) ||
      entry.content.toLowerCase().includes(searchLower) ||
      (entry.mood && entry.mood.toLowerCase().includes(searchLower)) ||
      dateString.includes(searchTerm) || // 24.06.2025
      dateStringEn.includes(searchTerm) || // 6/24/2025
      year.includes(searchTerm) || // 2025
      month.includes(searchLower) || // june
      monthTr.includes(searchLower) || // haziran
      day.includes(searchTerm) // 24
    );
  });

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          ⏳ Loading your memories...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '20px'
    }}>
      
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        marginBottom: '40px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '900',
              margin: '0',
              background: 'linear-gradient(45deg, #FFD700, #FF69B4, #00BFFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              📖 My Diary
            </h1>
            <p style={{
              fontSize: '18px',
              opacity: '0.8',
              margin: '5px 0 0 0'
            }}>
              Your digital sanctuary ✨
            </p>
          </div>
          
          <Link 
            to="/create" 
            style={{
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
              padding: '16px 32px',
              borderRadius: '50px',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
            }}
          >
            ✨ New Entry
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 40px auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '24px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FFD700' }}>
            {searchTerm ? filteredEntries.length : entries.length}
          </div>
          <div style={{ fontSize: '14px', opacity: '0.8' }}>
            {searchTerm ? 'Found Entries' : 'Total Entries'}
          </div>
        </div>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '24px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#00BFFF' }}>
            {entries.filter(e => e.mood?.includes('😊')).length}
          </div>
          <div style={{ fontSize: '14px', opacity: '0.8' }}>Happy Days</div>
        </div>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '24px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FF69B4' }}>
            {new Date().getDate()}
          </div>
          <div style={{ fontSize: '14px', opacity: '0.8' }}>Today</div>
        </div>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '24px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#32CD32' }}>
            🔥
          </div>
          <div style={{ fontSize: '14px', opacity: '0.8' }}>Streak</div>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto 40px auto'
      }}>
        <div style={{
          position: 'relative'
        }}>
          <input
            type="text"
            placeholder="🔍 Search your memories... (title, content, mood, date)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '20px 60px 20px 20px',
              fontSize: '16px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '25px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              backdropFilter: 'blur(15px)',
              transition: 'all 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.border = '2px solid #FFD700';
              e.target.style.transform = 'scale(1.02)';
              e.target.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.3)';
            }}
            onBlur={(e) => {
              e.target.style.border = '2px solid rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '16px'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              ✕
            </button>
          )}
        </div>
        
        {/* Search Results Info */}
        {searchTerm && (
          <div style={{
            textAlign: 'center',
            marginTop: '15px',
            fontSize: '14px',
            opacity: '0.8'
          }}>
            {filteredEntries.length > 0 
              ? `Found ${filteredEntries.length} result${filteredEntries.length !== 1 ? 's' : ''} for "${searchTerm}"`
              : `No results found for "${searchTerm}"`
            }
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto 20px auto',
          background: 'rgba(255, 99, 132, 0.2)',
          border: '1px solid rgba(255, 99, 132, 0.3)',
          borderRadius: '15px',
          padding: '16px',
          color: '#FF6B6B'
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {entries.length === 0 ? (
          /* Empty State */
          <div style={{
            textAlign: 'center',
            padding: '80px 20px'
          }}>
            <div style={{
              fontSize: '120px',
              marginBottom: '30px',
              opacity: '0.8'
            }}>
              📝
            </div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '16px'
            }}>
              Start Your Journey
            </h3>
            <p style={{
              fontSize: '18px',
              opacity: '0.8',
              marginBottom: '40px',
              maxWidth: '400px',
              margin: '0 auto 40px auto'
            }}>
              Every great story starts with a single page. What's yours?
            </p>
            <Link 
              to="/create" 
              style={{
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                padding: '20px 40px',
                borderRadius: '50px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '18px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
              }}
            >
              🚀 Create First Entry
            </Link>
          </div>
        ) : filteredEntries.length === 0 ? (
          /* No Search Results */
          <div style={{
            textAlign: 'center',
            padding: '80px 20px'
          }}>
            <div style={{
              fontSize: '120px',
              marginBottom: '30px',
              opacity: '0.6'
            }}>
              🔍
            </div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '16px'
            }}>
              No Results Found
            </h3>
            <p style={{
              fontSize: '18px',
              opacity: '0.8',
              marginBottom: '40px',
              maxWidth: '400px',
              margin: '0 auto 40px auto'
            }}>
              Try searching with different keywords or{' '}
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFD700',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: 'inherit'
                }}
              >
                clear your search
              </button>
            </p>
          </div>
        ) : (
          /* Entries Grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {filteredEntries.map((entry, index) => (
              <div 
                key={entry.id} 
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '25px',
                  padding: '30px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.3)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
              >
                {/* Entry Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '20px'
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      margin: '0 0 10px 0',
                      color: 'white'
                    }}>
                      {entry.title}
                    </h3>
                    {entry.mood && (
                      <span style={{
                        background: 'rgba(255,255,255,0.2)',
                        padding: '6px 12px',
                        borderRadius: '15px',
                        fontSize: '14px',
                        border: '1px solid rgba(255,255,255,0.3)'
                      }}>
                        {entry.mood}
                      </span>
                    )}
                  </div>
                  <span style={{
                    fontSize: '12px',
                    opacity: '0.7',
                    background: 'rgba(255,255,255,0.1)',
                    padding: '4px 8px',
                    borderRadius: '10px'
                  }}>
                    📅 {new Date(entry.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>

                {/* Entry Content */}
                <p style={{
                  opacity: '0.9',
                  lineHeight: '1.6',
                  marginBottom: '24px',
                  fontSize: '15px'
                }}>
                  {entry.content.length > 150 
                    ? entry.content.substring(0, 150) + '...' 
                    : entry.content}
                </p>

                {/* Entry Actions */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <Link 
                    to={`/edit/${entry.id}`}
                    style={{
                      color: '#00BFFF',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = '#87CEEB';
                      e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = '#00BFFF';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    ✏️ Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(entry.id)}
                    style={{
                      color: '#FF6B6B',
                      background: 'none',
                      border: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = '#FF9999';
                      e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = '#FF6B6B';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;