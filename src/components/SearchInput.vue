<template>
  <div class="searchInput_container">
    <el-popover
      placement="right"
      width="600"
      trigger="manual"
      @show="showPopover"
      v-model="visible"
    >
      <div class="popover_container">
        <ModuleTitle>
          <p>搜索</p>
        </ModuleTitle>
        <el-form ref="form" label-width="80px">
          <p class="form_title">
            搜索条件
          </p>
          <el-row :gutter="10" v-for="(item, index) in this.form" :key="index" class="el-row">
            <el-col :span="7">
              <el-select v-model="form[index].dbName" placeholder="请选择" @change="selectedItemChange(index)">
                <el-option
                  v-for="item in options"
                  :key="item.fieldId"
                  :label="item.name"
                  :value="item.dbName">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="form[index].filterSymbol" placeholder="请选择">
                <el-option
                  v-for="item in secondOptions"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="11" v-if="thirdOptions(item).length > 0 && ['10', '20'].includes(thirdOptions(item)[0].showType)">
              <el-input type="text" v-model="form[index].filterValue"></el-input>
            </el-col>
            <el-col :span="11" v-if="thirdOptions(item).length > 0 && ['40'].includes(thirdOptions(item)[0].showType)">
              <el-select v-model="form[index].filterValue" placeholder="请选择">
                <el-option
                  v-for="item in thirdOptions(item)[0].downBoxValue"
                  :key="item.name"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="11" v-if="thirdOptions(item).length > 0 && ['30'].includes(thirdOptions(item)[0].showType)">
              <el-date-picker
                v-model="form[index].filterValue"
                type="daterange"
                placeholder="选择日期"
                value-format="timestamp"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="2">
              <el-button v-if="index === 0 && needBtn" class="add_button" @click="addItem">添加</el-button>
              <el-button v-if="index !== 0" class="delete_button" @click="deleteItem(index)">删除</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div class="btn_group">
          <button class="blackBtn" @click="resetButton">取消</button>
          <button class="redBtn" @click="handleClickSure">确认</button>
        </div>
      </div>
      <button slot="reference" class="searchButton iconfont icon-sousuo" @click="visible = !visible">搜索</button>
    </el-popover>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'SearchInput',
  props: {
    options: {
      type: Array
    },
    needBtn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      visible: false,
      form: [
        {
          filterSymbol: '1',
          filterValue: '',
          dbName: ''
        }
      ],
      secondOptions: [
        {
          value: '等于',
          id: '1'
        },
        {
          value: '不等于',
          id: '2'
        },
        {
          value: '为空',
          id: '3'
        },
        {
          value: '不为空',
          id: '4'
        }
      ]
    }
  },
  computed: {

  },
  methods: {
    /**
     * @description: 监听select改变
     * @param:
     * @return:
     */
    selectedItemChange (index) {
      this.form[index].filterValue = ''
    },
    thirdOptions (val) {
      return this.options.filter(item => item.dbName === val.dbName)
    },
    showPopover () {
      console.log(this.options)
      this.form.forEach(item => {
        item.dbName = this.options[0].dbName
      })
    },
    handleClickSure () {
      let params = []
      this.form.forEach((item, index) => {
        params[index] = {...this.options.filter(v => v.dbName === item.dbName)[0], ...item}
      })
      this.$emit('searchItem', params)
      this.visible = !this.visible
    },
    /**
     * @description: 添加列表项
     * @param:
     * @return:
     */
    addItem () {
      if (this.form.length < 5) {
        this.form.push({
          filterSymbol: '1',
          filterValue: [],
          dbName: this.options[0].dbName
        })
      } else {
        this.$message.error('只允许添加5条')
      }
    },
    /**
     * @description: 删除
     * @param:
     * @return:
     */
    deleteItem (index) {
      this.form.splice(index, 1)
    },
    /**
     * @description: 重置
     * @param:
     * @return:
     */
    resetButton () {
      this.form = [
        {
          filterSymbol: '1',
          filterValue: '',
          dbName: this.options[0].dbName
        }
      ]
      this.visible = !this.visible
    },
    ...mapActions(['getAllFields'])
  },
  created () {
  }
}
</script>

<style scoped lang="less">
  .add_button, .delete_button {
    padding: 0;
  }

  .searchInput_container {
    position: relative;
  }

  .searchButton {
    background: none;
    border-style: none;
    .font();
    cursor: pointer;

    &:before {
      .font(12px, @red);
      margin-right: 8px;
    }
  }

  .form_title {
    font-size: 12px;
    line-height: 1.5;
    margin-bottom: 10px;
  }

  .add_button {
    color: #333;
    border: 1px solid #333;
    border-radius: 5px;
    font-size: 12px;
    background: none;
    height: 34px;
    width: 100%;
  }
  .delete_button{
    color: @red;
    border: 1px solid @red;
    border-radius: 5px;
    font-size: 12px;
    background: none;
    height: 34px;
    width: 100%;
  }

  .btn_group {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;

    button {
      margin-left: 10px;
    }
  }
  .el-row{
    margin-bottom: 20px;
  }
  .secondDate{
    margin-top: 20px;
  }
  .el-range-editor{
    width: 100%!important;
    display: flex;
    padding-right: 0;
    /deep/ .el-date-editor .el-range-input {
      width: 53%;
    }
    /deep/ .el-date-editor .el-range-separator {
      width: auto;
    }
  }
</style>
