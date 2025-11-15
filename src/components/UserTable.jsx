import React from "react";

const UserTable = ({ users, onBan, onDelete, profileChanges = {} }) => {
  // Helper function to check if a field was recently changed and get the change info
  const getFieldChangeInfo = (userId, fieldName) => {
    if (!profileChanges[userId]) return null;
    const changes = profileChanges[userId];
    return changes.find(change => change.fieldName === fieldName);
  };

  // Helper function to get most recent change timestamp for a user
  const getMostRecentChangeTime = (userId) => {
    if (!profileChanges[userId] || profileChanges[userId].length === 0) return null;
    const changes = profileChanges[userId];
    const sorted = [...changes].sort((a, b) => new Date(b.changedAt) - new Date(a.changedAt));
    return new Date(sorted[0].changedAt);
  };

  // Helper function to format date for tooltip
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString();
  };

  // Helper function to get highlight style if field changed
  const getFieldStyle = (userId, fieldName) => {
    const change = getFieldChangeInfo(userId, fieldName);
    const baseStyle = { padding: 8, position: 'relative' };
    
    if (change) {
      return {
        ...baseStyle,
        backgroundColor: '#fef3c7',
        borderRadius: '4px',
        cursor: 'help',
        title: `Changed from "${change.oldValue}" to "${change.newValue}" on ${formatDate(change.changedAt)}`
      };
    }
    return baseStyle;
  };

  return (
    <div style={{ width: '100%' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif' }}>
        <thead>
          <tr style={{ textAlign: 'left', background: '#f7f7f7' }}>
            <th style={{ padding: 8 }}>#</th>
            <th style={{ padding: 8 }}>User ID</th>
            <th style={{ padding: 8 }}>Name</th>
            <th style={{ padding: 8 }}>Nickname</th>
            <th style={{ padding: 8 }}>Email</th>
            <th style={{ padding: 8 }}>Phone</th>
            <th style={{ padding: 8 }}>City</th>
            <th style={{ padding: 8 }}>Joined</th>
            <th style={{ padding: 8 }}>Status</th>
            <th style={{ padding: 8 }}>Last Changed</th>
            <th style={{ padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => {
            const mostRecentChange = getMostRecentChangeTime(user._id);
            const fullName = (user.firstName || user.communityNickname) ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.communityNickname : user.userId;

            return (
              <tr key={user._id} style={{ borderTop: '1px solid #eee' }}>
                <td style={{ padding: 8, width: 40 }}>{idx + 1}</td>
                <td style={getFieldStyle(user._id, 'userId')} title={getFieldChangeInfo(user._id, 'userId') ? `Changed on ${formatDate(getFieldChangeInfo(user._id, 'userId').changedAt)}` : ''}>
                  {user.userId}
                </td>
                <td style={getFieldStyle(user._id, 'firstName')} title={getFieldChangeInfo(user._id, 'firstName') ? `Changed on ${formatDate(getFieldChangeInfo(user._id, 'firstName').changedAt)}` : ''}>
                  {fullName}
                </td>
                <td style={getFieldStyle(user._id, 'communityNickname')} title={getFieldChangeInfo(user._id, 'communityNickname') ? `Changed on ${formatDate(getFieldChangeInfo(user._id, 'communityNickname').changedAt)}` : ''}>
                  {user.communityNickname || '-'}
                </td>
                <td style={getFieldStyle(user._id, 'email')} title={getFieldChangeInfo(user._id, 'email') ? `Changed on ${formatDate(getFieldChangeInfo(user._id, 'email').changedAt)}` : ''}>
                  {user.email || '-'}
                </td>
                <td style={getFieldStyle(user._id, 'phone')} title={getFieldChangeInfo(user._id, 'phone') ? `Changed on ${formatDate(getFieldChangeInfo(user._id, 'phone').changedAt)}` : ''}>
                  {user.phone || '-'}
                </td>
                <td style={getFieldStyle(user._id, 'city')} title={getFieldChangeInfo(user._id, 'city') ? `Changed on ${formatDate(getFieldChangeInfo(user._id, 'city').changedAt)}` : ''}>
                  {user.city || '-'}
                </td>
                <td style={{ padding: 8, fontSize: '12px', color: '#666' }}>
                  {user.createdAt ? formatDate(user.createdAt) : '-'}
                </td>
                <td style={{ padding: 8 }}>
                  {user.banned ? (
                    <span style={{ color: '#c0392b', fontWeight: '600' }}>Banned</span>
                  ) : (
                    <span style={{ color: '#16a34a', fontWeight: '600' }}>Active</span>
                  )}
                </td>
                <td style={{ padding: 8, fontSize: '12px', color: '#666' }}>
                  {mostRecentChange ? formatDate(mostRecentChange) : '-'}
                </td>
                <td style={{ padding: 8 }}>
                  <button
                    style={{
                      marginRight: 8,
                      padding: '6px 10px',
                      borderRadius: 4,
                      border: '1px solid #ddd',
                      background: user.banned ? '#fff' : '#fef3c7',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}
                    onClick={() => onBan(user._id, !user.banned)}
                  >
                    {user.banned ? 'Unban' : 'Ban'}
                  </button>
                  <button
                    style={{
                      padding: '6px 10px',
                      borderRadius: 4,
                      border: '1px solid #ddd',
                      background: '#fee2e2',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}
                    onClick={() => onDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
