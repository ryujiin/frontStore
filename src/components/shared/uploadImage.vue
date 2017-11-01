<template lang="pug">
.uploadImages
  form(enctype='multipart/form-data', novalidate='', v-if='isInitial || isSaving')
    .dropbox
      input.input-file(type='file', multiple='', :name='uploadFieldName', :disabled='isSaving', @change='filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length', accept='image/*')
      p(v-if='isInitial')
        | Sube tus fotos con el producto 
        br
        strong Obten el 10% de descuento en tu siguiente compra!
      p(v-if='isSaving')
        | Uploading {{ fileCount }} files...
  // SUCCESS
  div(v-if='isSuccess')
    h2 Uploaded {{ uploadedFiles.length }} file(s) successfully.
    p
      a(href='javascript:void(0)', @click='reset()') Upload again
    ul.list-unstyled
      li(v-for='item in uploadedFiles')
        img.img-responsive.img-thumbnail(:src='item.url', :alt='item.originalName')
  // FAILED
  div(v-if='isFailed')
    h2 Uploaded failed.
    p
      a(href='javascript:void(0)', @click='reset()') Try again
    pre.
      \n{{ uploadError }}   

</template>

<script>
  import {upload} from '@/services/axios/lovizApiImage'
  
  const STATUS_INITIAL = 0
  const STATUS_SAVING = 1
  const STATUS_SUCCESS = 2
  const STATUS_FAILED = 3

  export default {
    props: ['comentario'],
    data () {
      return {
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'foto'
      }
    },
    computed: {
      isInitial () {
        return this.currentStatus === STATUS_INITIAL
      },
      isSaving () {
        return this.currentStatus === STATUS_SAVING
      },
      isSuccess () {
        return this.currentStatus === STATUS_SUCCESS
      },
      isFailed () {
        return this.currentStatus === STATUS_FAILED
      }
    },
    methods: {
      reset () {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL
        this.uploadedFiles = []
        this.uploadError = null
      },
      save (formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING

        upload(formData)
          .then(x => {
            this.uploadedFiles.push(x)
            // this.currentStatus = STATUS_SUCCESS;
          })
          .catch(err => {
            console.log(err)
            this.uploadError = err.response
            this.currentStatus = STATUS_FAILED
          })
      },
      filesChange (fieldName, fileList) {
        // handle file changes
        var formData = new FormData()
        var i
        if (!fileList.length) return

        // append the files to FormData
        for (i = 0; i < fileList.length; i++) {
          formData.append('comentario', this.comentario.id)
          formData.append(fieldName, fileList[i], fileList[i].name)
          this.save(formData)
        }
        // Array
          // .from(Array(fileList.length).keys())
          // .map(x => {
            // console.log(this.comentario.id)
            // formData.append('comentario', this.comentario.id);
            // formData.append(fieldName, fileList[x], fileList[x].name);
            // this.save(formData)
          // });
        //  save it
        // this.save(formData);
      }
    },
    mounted () {
      this.reset()
    }
  }
</script>

<style lang="scss" scoped>
.dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 5px 5px;
    min-height: 50px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 100px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 20px 0;
  }
</style>