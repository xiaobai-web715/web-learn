package com.lxh.mybatis.entity;

import java.util.ArrayList;
import java.util.List;

public class hospSectionRelationExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    public hospSectionRelationExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andAncestorIsNull() {
            addCriterion("ancestor is null");
            return (Criteria) this;
        }

        public Criteria andAncestorIsNotNull() {
            addCriterion("ancestor is not null");
            return (Criteria) this;
        }

        public Criteria andAncestorEqualTo(Integer value) {
            addCriterion("ancestor =", value, "ancestor");
            return (Criteria) this;
        }

        public Criteria andAncestorNotEqualTo(Integer value) {
            addCriterion("ancestor <>", value, "ancestor");
            return (Criteria) this;
        }

        public Criteria andAncestorGreaterThan(Integer value) {
            addCriterion("ancestor >", value, "ancestor");
            return (Criteria) this;
        }

        public Criteria andAncestorGreaterThanOrEqualTo(Integer value) {
            addCriterion("ancestor >=", value, "ancestor");
            return (Criteria) this;
        }

        public Criteria andAncestorLessThan(Integer value) {
            addCriterion("ancestor <", value, "ancestor");
            return (Criteria) this;
        }

        public Criteria andAncestorLessThanOrEqualTo(Integer value) {
            addCriterion("ancestor <=", value, "ancestor");
            return (Criteria) this;
        }

        public Criteria andAncestorIn(List<Integer> values) {
            addCriterion("ancestor in", values, "ancestor");
            return (Criteria) this;
        }

        public Criteria andAncestorNotIn(List<Integer> values) {
            addCriterion("ancestor not in", values, "ancestor");
            return (Criteria) this;
        }

        public Criteria andAncestorBetween(Integer value1, Integer value2) {
            addCriterion("ancestor between", value1, value2, "ancestor");
            return (Criteria) this;
        }

        public Criteria andAncestorNotBetween(Integer value1, Integer value2) {
            addCriterion("ancestor not between", value1, value2, "ancestor");
            return (Criteria) this;
        }

        public Criteria andDescendantIsNull() {
            addCriterion("descendant is null");
            return (Criteria) this;
        }

        public Criteria andDescendantIsNotNull() {
            addCriterion("descendant is not null");
            return (Criteria) this;
        }

        public Criteria andDescendantEqualTo(Integer value) {
            addCriterion("descendant =", value, "descendant");
            return (Criteria) this;
        }

        public Criteria andDescendantNotEqualTo(Integer value) {
            addCriterion("descendant <>", value, "descendant");
            return (Criteria) this;
        }

        public Criteria andDescendantGreaterThan(Integer value) {
            addCriterion("descendant >", value, "descendant");
            return (Criteria) this;
        }

        public Criteria andDescendantGreaterThanOrEqualTo(Integer value) {
            addCriterion("descendant >=", value, "descendant");
            return (Criteria) this;
        }

        public Criteria andDescendantLessThan(Integer value) {
            addCriterion("descendant <", value, "descendant");
            return (Criteria) this;
        }

        public Criteria andDescendantLessThanOrEqualTo(Integer value) {
            addCriterion("descendant <=", value, "descendant");
            return (Criteria) this;
        }

        public Criteria andDescendantIn(List<Integer> values) {
            addCriterion("descendant in", values, "descendant");
            return (Criteria) this;
        }

        public Criteria andDescendantNotIn(List<Integer> values) {
            addCriterion("descendant not in", values, "descendant");
            return (Criteria) this;
        }

        public Criteria andDescendantBetween(Integer value1, Integer value2) {
            addCriterion("descendant between", value1, value2, "descendant");
            return (Criteria) this;
        }

        public Criteria andDescendantNotBetween(Integer value1, Integer value2) {
            addCriterion("descendant not between", value1, value2, "descendant");
            return (Criteria) this;
        }

        public Criteria andDistanceIsNull() {
            addCriterion("distance is null");
            return (Criteria) this;
        }

        public Criteria andDistanceIsNotNull() {
            addCriterion("distance is not null");
            return (Criteria) this;
        }

        public Criteria andDistanceEqualTo(Integer value) {
            addCriterion("distance =", value, "distance");
            return (Criteria) this;
        }

        public Criteria andDistanceNotEqualTo(Integer value) {
            addCriterion("distance <>", value, "distance");
            return (Criteria) this;
        }

        public Criteria andDistanceGreaterThan(Integer value) {
            addCriterion("distance >", value, "distance");
            return (Criteria) this;
        }

        public Criteria andDistanceGreaterThanOrEqualTo(Integer value) {
            addCriterion("distance >=", value, "distance");
            return (Criteria) this;
        }

        public Criteria andDistanceLessThan(Integer value) {
            addCriterion("distance <", value, "distance");
            return (Criteria) this;
        }

        public Criteria andDistanceLessThanOrEqualTo(Integer value) {
            addCriterion("distance <=", value, "distance");
            return (Criteria) this;
        }

        public Criteria andDistanceIn(List<Integer> values) {
            addCriterion("distance in", values, "distance");
            return (Criteria) this;
        }

        public Criteria andDistanceNotIn(List<Integer> values) {
            addCriterion("distance not in", values, "distance");
            return (Criteria) this;
        }

        public Criteria andDistanceBetween(Integer value1, Integer value2) {
            addCriterion("distance between", value1, value2, "distance");
            return (Criteria) this;
        }

        public Criteria andDistanceNotBetween(Integer value1, Integer value2) {
            addCriterion("distance not between", value1, value2, "distance");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table hosp_section_relation
     *
     * @mbggenerated do_not_delete_during_merge
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}