import * as React from 'react';


export default function Test() {
  return (
<div style={{width: '100%', height: '100%', paddingLeft: 32, paddingRight: 32, paddingTop: 24, paddingBottom: 24, background: 'white', justifyContent: 'center', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
    <div style={{width: 69, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', gap: 2, display: 'flex'}}>
        <div style={{color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '600', textTransform: 'capitalize', wordWrap: 'break-word'}}>Logo</div>
    </div>
    <div style={{flex: '1 1 0', height: 24, justifyContent: 'flex-start', alignItems: 'center', gap: 40, display: 'flex'}}>
        <div style={{color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, letterSpacing: 0.16, wordWrap: 'break-word'}}>Dashboard</div>
        <div style={{color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, letterSpacing: 0.16, wordWrap: 'break-word'}}>Jobs</div>
        <div style={{color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, letterSpacing: 0.16, wordWrap: 'break-word'}}>Applicants</div>
        <div style={{color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, letterSpacing: 0.16, wordWrap: 'break-word'}}>Company</div>
    </div>
    <div style={{flex: '1 1 0', height: 45, justifyContent: 'flex-end', alignItems: 'center', gap: 32, display: 'flex'}}>
        <div style={{width: 300, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', height: 40, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            </div>
        </div>
    </div>
</div>
  );
}