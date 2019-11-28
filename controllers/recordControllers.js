const fs = require('fs');

const recordModule = require('../models/recordModels');

const Validate = require('../helpers/validationHelper');

const postsData = fs.readFileSync('data/recordsData.json');

const today = `${new Date().getDay()} / ${new Date().getMonth()} / ${new Date().getFullYear()}`;
exports.addRecord = (req, res) => {
  const validation = new Validate();
  const values = req.body;
  let postId = 0;
  const postRecord = JSON.parse(postsData) || [];
  const passed = validation.check(recordModule.RecordCreation, values, postRecord);
  if (passed === true) {
    if (postRecord.length === 0) {
      postId = 1;
    } else {
      const maxId = (array, prop) => {
        let max;
        for (let i = 0; i < array.length; i += 1) {
          if (!max || parseInt(array[i][prop]) > parseInt(max[prop])) { max = array[i]; }
        }
        return max.id + 1;
      };

      postId = maxId(postRecord, 'id');
    }
    postRecord.push({
      id: postId,
      title: values.title,
      user_id: req.id,
      status: values.status,
      description: values.description,
      type: values.type,
      location: values.location,
      images: values.images,
      videos: values.videos,
      comment: values.comment,
      createdOn: today,
    });
    let rawData = JSON.stringify(postRecord, null, 2);
    fs.writeFile('data/recordsData.json', rawData, (err) =>{
        if(err) throw err;
    });
    res.status(201).send({
      status: 201,
      data: {
        id: postId,
        message: `Created ${values.type} record`,
      },
    });
  } else {
    res.status(400).send({
      status: 400,
      message: passed,
    });
  }
};


exports.getOneRecord = (req, res) => {
  const { postId } = req.params;
  const user_id = req.id;
  const postRecord = JSON.parse(postsData) || [];
  if (postRecord.length > 0) {
    const data = postRecord.find((postdata) => postdata.id === parseInt(postId));
    // const data = found.find((onepost) => onepost.type === 'red-flag');
    if (typeof (data) !== 'undefined') {
        console.log(data.type);
      if (data.type === 'red-flag') {
        res.status(200).send({
          status: 200,
          data: {
            data,
          },
        });
      } else {
        res.status(403).send({
          status: 403,
          message: 'record you are trying to get is not yours!',
        });
      }
    } else {
      res.status(404).send({
        status: 404,
        message: 'record not found!',
      });
    }
  } else {
    res.status(404).send({
      status: 404,
      message: 'record not found!',
    });
  }
};

exports.getAllRedFlags = (req, res) => {
  const postRecord = JSON.parse(postsData);
  const user_id = req.id;
  if (postRecord.length > 0) {
    const data = postRecord.filter((postdata) => postdata.type === "red-flag");
    console.log(data);
    if (typeof (data) !== 'undefined' && data.length > 0) {
      res.status(200).send({
        status: 200,
        data ,
      });
    } else {
      res.status(404).send({
        status: 404,
        message: 'no record posted yet',
      });
    }
  } else {
    res.status(404).json({
      status: 404,
      message: 'record not found',
    });
  }
};

exports.deleteRedFlag = (req, res) => {
  const { postId } = req.params;
  const user_id = req.id;
  const postRecord = JSON.parse(postsData);
  if (postRecord.length > 0) {
    const found = postRecord.find((postdata) => postdata.id === parseInt(postId));
    if (typeof (found) !== 'undefined') {
      if (found.type === 'red-flag') {
        const key = postRecord.indexOf(found);
        delete postRecord[key];
        const data = postRecord.filter((x) => x !== null);
        fs.writeFile('data/recordsData.json', JSON.stringify(data, null, 2), (err) =>{
            if(err) throw err;
        });
        res.status(204).send({
          status: 204,
          data: {
              id: found.id,
              message: 'red-flag record has been deleted!',
          },
        });
      } else {
        res.status(403).send({
          status: 403,
          message: 'trying to delete someone else record',
        });
      }
    } else {
      res.status(404).send({
        status: 404,
        message: 'record not found',
      });
    }
  } else {
    res.status(404).send({
      status: 404,
      message: 'no record found',
    });
  }
};