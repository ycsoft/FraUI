export class Order {
    email = '';
    invoice = false;
    inv_type = 'common';
    inv_header = '';
    contacts = '';
    phone = '';
    province = '';
    city = '';
    address = '';
    pay_type = '';
    company_name = '';
    company_addr = '';
    bank_account = '';
    open_bank = '';
    tax_no = '';
    rules = '';
    order_no = '';
    total_amount = 0;
    keywords = '';
    errors = <any>{};

    // 添加用户会话信息
    user = '';
    token = '';
    money = '';

    constructor() {

    }
}
