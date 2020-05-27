import React from 'react';
import styles from './index.css';
import jobAllData from './data/job.json';
import Cascader from 've-pc-react-cascader-post';
const jobData = jobAllData.data.job;
// console.log(Cascader)
console.log(jobData);

export default function() {
  const handleOnchange = (selected: any, value: any) => {
    console.log(selected, value);
  };
  return (
    <div className={styles.normal}>
      <Cascader
        data={jobData}
        value={[]}
        limit={5}
        onSave={(data: any[]) => {
          console.log('保存', data);
        }}
        onCancel={() => {
          console.log('取消');
        }}
      ></Cascader>
    </div>
  );
}
