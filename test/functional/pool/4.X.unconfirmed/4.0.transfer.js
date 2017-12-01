'use strict';

var test = require('../../functional.js');

var lisk = require('lisk-js');
var expect = require('chai').expect;

var phases = require('../../common/phases');
var Scenarios = require('../../common/scenarios');
var localCommon = require('./common');

var sendTransactionPromise = require('../../../common/helpers/api').sendTransactionPromise;

var randomUtil = require('../../../common/utils/random');

describe('POST /api/transactions (unconfirmed type 0 on top of type 4)', function () {

	var scenarios = {
		'regular': new Scenarios.Multisig()
	};

	var transaction;
	var badTransactions = [];
	var goodTransactions = [];

	localCommon.beforeValidationPhase(scenarios);

	describe('sending funds', function () {

		it('regular scenario should be ok', function () {
			transaction = lisk.transaction.createTransaction(randomUtil.account().address, 1, scenarios.regular.account.password);

			return sendTransactionPromise(transaction).then(function (res) {
				expect(res).to.have.property('status').to.equal(200);
				expect(res).to.have.nested.property('body.status').to.equal('Transaction(s) accepted');
				goodTransactions.push(transaction);
			});
		});
	});

	describe('confirmation', function () {

		phases.confirmation(goodTransactions, badTransactions);
	});
});
