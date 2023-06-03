import axios from 'axios'
import {HOST, PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET} from '../config.js'

export const createOrder = async (req, res) => {
    const order = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "105.70",
            },
          },
        ],
        application_context: {
          brand_name: "mycompany.com",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: `${HOST}/capture-order`,
          cancel_url: `${HOST}/cancel-payment`,
        },
      };

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const {
        data: { access_token },
      } = await axios.post(
        `${PAYPAL_API}/v1/oauth2/token`,
        params,
        {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            },
          auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET,
          },
        }
    );
      console.log(access_token);

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
        headers: {
            Authorization: `Bearer ${access_token}`,
          },
    })


    return res.json(response.data)
}

export const captureOrder = async (req, res) => {
    const { token } = req.query

    const response =  await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
    {},
    {
        auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET,
        },
    })
    console.log(response)

    return res.json(response.data)
}

export const cancelPayment = (req, res) => res.redirect('/')