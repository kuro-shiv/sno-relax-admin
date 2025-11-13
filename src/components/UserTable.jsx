import React from "react";

const UserTable = ({ users, onBan, onDelete }) => {
  return (
    <div style={{ width: '100%' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif' }}>
        <thead>
          <tr style={{ textAlign: 'left', background: '#f7f7f7' }}>
            <th style={{ padding: 8 }}>#</th>
            <th style={{ padding: 8 }}>User ID</th>
            <th style={{ padding: 8 }}>Name</th>
            <th style={{ padding: 8 }}>Email</th>
            <th style={{ padding: 8 }}>City</th>
            <th style={{ padding: 8 }}>Status</th>
            <th style={{ padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id} style={{ borderTop: '1px solid #eee' }}>
              <td style={{ padding: 8, width: 40 }}>{idx + 1}</td>
              <td style={{ padding: 8, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.userId}</td>
              <td style={{ padding: 8 }}>{(user.firstName || user.communityNickname) ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.communityNickname : user.userId}</td>
              <td style={{ padding: 8 }}>{user.email || '-'}</td>
              <td style={{ padding: 8 }}>{user.city || '-'}</td>
              <td style={{ padding: 8 }}>{user.banned ? <span style={{ color: '#c0392b' }}>Banned</span> : <span style={{ color: '#16a34a' }}>Active</span>}</td>
              <td style={{ padding: 8 }}>
                <button style={{ marginRight: 8, padding: '6px 10px', borderRadius: 4, border: '1px solid #ddd', background: user.banned ? '#fff' : '#fef3c7' }} onClick={() => onBan(user._id, !user.banned)}>
                  {user.banned ? 'Unban' : 'Ban'}
                </button>
                <button style={{ padding: '6px 10px', borderRadius: 4, border: '1px solid #ddd', background: '#fee2e2' }} onClick={() => onDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
